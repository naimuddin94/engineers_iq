import { Request } from 'express';
import httpStatus from 'http-status';
import { message, verifyToken } from '../../lib';
import { AppError, fileUploadOnCloudinary } from '../../utils';
import { IChangePasswordPayload, ILoginPayload } from '../User/user.interface';
import User from '../User/user.model';

// Save new user information in the database
const saveUserIntoDB = async (req: Request) => {
  const { accessToken: requestAccessToken } = req.cookies;
  const userData = req.body;

  if (requestAccessToken) {
    const { role } = await verifyToken(requestAccessToken);
    if (userData?.role && role !== 'admin') {
      userData['role'] = 'user';
    }
  } else {
    if (userData?.role) {
      userData['role'] = 'user';
    }
  }
  const isUserExists = await User.isUserExists(userData.email);

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, message.email_exists);
  }

  if (req.file && req.file.buffer) {
    userData.image = await fileUploadOnCloudinary(req.file.buffer);
  }

  const result = await User.create(userData);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      message.user_creating_error
    );
  }

  const accessToken = result.generateAccessToken();
  const refreshToken = result.generateRefreshToken();

  result.refreshToken = refreshToken;

  await result.save();

  // Convert the result to an object and remove the password field
  const response = await User.findById(result._id).select(
    'name image address phone'
  );

  return { response, accessToken, refreshToken };
};

const loginUser = async (payload: ILoginPayload) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, message.user_not_exist);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(payload.password);

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, message.invalid_credentials);
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
      throw new AppError(httpStatus.NOT_FOUND, message.user_not_exist);
    }

    user.refreshToken = '';
    await user.save();
  }

  return null;
};

const changePasswordIntoDB = async (
  payload: IChangePasswordPayload,
  accessToken: string
) => {
  if (!accessToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, message.unauthorized);
  }

  const { id } = await verifyToken(accessToken);

  const user = await User.findById(id).select('+password');

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, message.user_not_exist);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(payload.oldPassword);

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, message.invalid_credentials);
  }

  user.password = payload.newPassword;
  await user.save();

  return null;
};

export const AuthService = {
  saveUserIntoDB,
  loginUser,
  logoutUser,
  changePasswordIntoDB,
};
