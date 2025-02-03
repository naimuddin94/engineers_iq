import status from 'http-status';
import mongoose from 'mongoose';
import { verifyToken } from '../../lib';
import { AppError, fileUploadOnCloudinary } from '../../utils';
import Article from '../Article/article.model';
import {
  IChangePasswordPayload,
  ILoginPayload,
  IUser,
} from '../User/user.interface';
import User from '../User/user.model';

// Save new user information in the database
const saveUserIntoDB = async (
  userData: Pick<
    IUser,
    'name' | 'email' | 'password' | 'username' | 'image' | 'role'
  >
) => {
  const isUserExists = await User.isUserExists(userData.email);

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, 'Email already exists!');
  }

  const isUsernameExists = await User.findOne({ username: userData.username });

  if (isUsernameExists) {
    throw new AppError(status.BAD_REQUEST, 'Username already exists!');
  }

  const result = await User.create(userData);

  if (!result) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong when saving the user info'
    );
  }

  const accessToken = result.generateAccessToken();
  const refreshToken = result.generateRefreshToken();

  result.refreshToken = refreshToken;

  await result.save();

  // Convert the result to an object and remove the password field
  const response = await User.findById(result._id).select(
    'name email username image'
  );

  return { response, accessToken, refreshToken };
};

const loginUser = async (payload: ILoginPayload) => {
  const user = await User.findOne({
    $or: [
      {
        email: payload.identity,
      },
      {
        username: payload.identity,
      },
    ],
  }).select('+password');

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exist!');
  }

  const isPasswordCorrect = await user.isPasswordCorrect(payload.password);

  if (!isPasswordCorrect) {
    throw new AppError(status.NOT_ACCEPTABLE, 'Invalid credentials');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const response = await User.findById(user.id).select(
    '-password -createdAt -updatedAt -refreshToken'
  );

  const data = response?.toObject();

  return { accessToken, refreshToken, data };
};

const logoutUser = async (accessToken: string) => {
  // checking if the token is missing
  if (accessToken) {
    const { id } = await verifyToken(accessToken);

    const user = await User.findById(id);

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'User does not exist!');
    }

    user.refreshToken = null;
    await user.save();
  }

  return null;
};

const changePasswordIntoDB = async (
  payload: IChangePasswordPayload,
  accessToken: string
) => {
  if (!accessToken) {
    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
  }

  const { id } = await verifyToken(accessToken);

  const user = await User.findById(id).select('+password');

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  const isPasswordCorrect = await user.isPasswordCorrect(payload.oldPassword);

  if (!isPasswordCorrect) {
    throw new AppError(status.NOT_ACCEPTABLE, 'Invalid credentials');
  }

  user.password = payload.newPassword;
  await user.save();

  return null;
};

const updateImageIntoDB = async (
  accessToken: string,
  // eslint-disable-next-line no-undef
  file: Express.Multer.File | undefined
) => {
  if (!accessToken) {
    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
  }

  if (!file) {
    throw new AppError(status.BAD_REQUEST, 'File is missing');
  }

  const { id } = await verifyToken(accessToken);
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exist!');
  }
  const imageUrl = await fileUploadOnCloudinary(file.buffer);

  if (!imageUrl) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something wrong when uploading image'
    );
  }
  user.image = imageUrl;
  await user.save();
  return user;
};

const updateNameIntoDB = async (accessToken: string, name: string) => {
  if (!accessToken) {
    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
  }
  const { id } = await verifyToken(accessToken);
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exist!');
  }
  user.name = name;
  await user.save();
  return user;
};

const getProfileInfoIntoDB = async (username: string) => {
  if (!username) {
    throw new AppError(status.BAD_REQUEST, 'Username must be provided');
  }

  const user = await User.findOne({ username }).populate([
    {
      path: 'followers',
      select: 'name username image premium',
    },
    {
      path: 'following',
      select: 'name username image premium',
    },
  ]);

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  return user;
};

const toggleFollowerIntoDB = async (accessToken: string, userId: string) => {
  if (!accessToken) {
    throw new AppError(status.UNAUTHORIZED, 'Unauthorized access');
  }

  const { id } = await verifyToken(accessToken);

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  const followingUser = await User.findById(userId);

  if (!followingUser) {
    throw new AppError(status.NOT_FOUND, 'User does not exist!');
  }

  const isFollowing = await User.exists({ _id: id, following: userId });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let result = null;
    let message = 'Follow successfully';

    if (isFollowing) {
      await User.findByIdAndUpdate(
        id,
        { $pull: { following: userId } },
        { session }
      );
      result = await User.findByIdAndUpdate(
        userId,
        { $pull: { followers: id } },
        { session, new: true }
      )
        .populate('followers')
        .select('followers');
      message = 'Unfollow successfully';
    } else {
      await User.findByIdAndUpdate(
        id,
        { $addToSet: { following: userId } },
        { session }
      );
      result = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: id } },
        { session, new: true }
      )
        .populate('followers')
        .select('followers');
    }

    await session.commitTransaction();
    session.endSession();

    return { result, message };
  } catch {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Failed to toggle following status'
    );
  }
};

const getUserAnalyticsFromDB = async (authorId: string) => {
  const result = await Article.aggregate([
    { $match: { author: new mongoose.Types.ObjectId(authorId) } },
    {
      $project: {
        monthYear: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        clapsCount: { $size: { $ifNull: ['$claps', []] } },
        commentsCount: { $size: { $ifNull: ['$comments', []] } },
        views: { $ifNull: ['$views', 0] },
        title: 1,
      },
    },
    {
      $group: {
        _id: '$monthYear',
        totalPosts: { $sum: 1 },
        totalPostViews: { $sum: '$views' },
        totalClaps: { $sum: '$clapsCount' },
        totalComments: { $sum: '$commentsCount' },
        articlesSummary: {
          $push: {
            title: '$title',
            views: '$views',
            claps: '$clapsCount',
            comments: '$commentsCount',
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPosts: { $sum: '$totalPosts' },
        totalPostViews: { $sum: '$totalPostViews' },
        totalClaps: { $sum: '$totalClaps' },
        totalComments: { $sum: '$totalComments' },
        totalMonths: { $sum: 1 },
        averagePostsPerMonth: { $avg: '$totalPosts' },
        articlesSummary: { $push: '$articlesSummary' },
      },
    },
    {
      $project: {
        _id: 0,
        totalPosts: 1,
        totalPostViews: 1,
        totalClaps: 1,
        totalComments: 1,
        totalMonths: 1,
        averagePostsPerMonth: 1,
        articlesSummary: {
          $reduce: {
            input: '$articlesSummary',
            initialValue: [],
            in: { $concatArrays: ['$$value', '$$this'] },
          },
        }, // Flatten array
      },
    },
  ]);

  return result.length > 0
    ? result[0]
    : {
        totalPosts: 0,
        totalPostViews: 0,
        totalClaps: 0,
        totalComments: 0,
        totalMonths: 0,
        averagePostsPerMonth: 0,
        articlesSummary: [],
      };
};

export const UserService = {
  saveUserIntoDB,
  loginUser,
  logoutUser,
  changePasswordIntoDB,
  updateImageIntoDB,
  updateNameIntoDB,
  getProfileInfoIntoDB,
  toggleFollowerIntoDB,
  getUserAnalyticsFromDB,
};
