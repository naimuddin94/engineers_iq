import status from 'http-status';
import { verifyToken } from '../../lib';
import { AppError, fileUploadOnCloudinary } from '../../utils';
import {
  IChangePasswordPayload,
  ILoginPayload,
  IUser,
} from '../User/user.interface';
import User from '../User/user.model';
import { USER_ROLE } from './user.constant';

// Save new user information in the database
const saveUserIntoDB = async (
  userData: Pick<
    IUser,
    'name' | 'email' | 'password' | 'username' | 'image' | 'role'
  >,

  // eslint-disable-next-line no-undef
  file: Express.Multer.File | undefined,
  token: string
) => {
  if (token) {
    const { role } = await verifyToken(token);
    if (userData?.role && role !== USER_ROLE.ADMIN) {
      userData['role'] = USER_ROLE.USER;
    }
  } else {
    if (userData?.role) {
      userData['role'] = USER_ROLE.USER;
    }
  }
  const isUserExists = await User.isUserExists(userData.email);

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, 'Email already exists!');
  }

  const isUsernameExists = await User.findOne({ username: userData.username });

  if (isUsernameExists) {
    throw new AppError(status.BAD_REQUEST, 'Username already exists!');
  }

  if (file) {
    const imageUrl = await fileUploadOnCloudinary(file.buffer);
    if (imageUrl) {
      userData.image = imageUrl;
    }
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

const getProfileInfoIntoDB = async (username: string) => {
  if (!username) {
    throw new AppError(status.BAD_REQUEST, 'Username must be provided');
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  return user;
};

export const UserService = {
  saveUserIntoDB,
  loginUser,
  logoutUser,
  changePasswordIntoDB,
  getProfileInfoIntoDB,
};
