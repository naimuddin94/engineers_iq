import { CookieOptions } from 'express';
import status from 'http-status';
import { AppResponse, asyncHandler, options } from '../../utils';
import { UserService } from './user.service';

const signup = asyncHandler(async (req, res) => {
  const payload = req.body;

  const { response, accessToken, refreshToken } =
    await UserService.saveUserIntoDB(payload);

  res
    .status(status.CREATED)
    .cookie('refreshToken', refreshToken, options as CookieOptions)
    .cookie('accessToken', accessToken, options as CookieOptions)
    .json(
      new AppResponse(
        status.CREATED,
        { ...response?.toObject(), accessToken, refreshToken },
        'User saved successfully'
      )
    );
});

const signin = asyncHandler(async (req, res) => {
  const { data, accessToken, refreshToken } = await UserService.loginUser(
    req.body
  );

  res
    .status(200)
    .cookie('refreshToken', refreshToken, options as CookieOptions)
    .cookie('accessToken', accessToken, options as CookieOptions)
    .json(
      new AppResponse(
        200,
        { ...data, accessToken, refreshToken },
        'User signin successfully'
      )
    );
});

const signout = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;

  await UserService.logoutUser(accessToken);

  res
    .status(status.OK)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json(new AppResponse(status.OK, null, 'User signout successfully'));
});

const changePassword = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const payload = req.body;

  await UserService.changePasswordIntoDB(payload, accessToken);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, null, 'Password changed successfully'));
});

const changeImage = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const file = req.file;

  const result = await UserService.updateImageIntoDB(accessToken, file);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Image changed successfully'));
});

const changeName = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const name = req.body.name;

  const result = await UserService.updateNameIntoDB(accessToken, name);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Name changed successfully'));
});

const getUserInfo = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const result = await UserService.getProfileInfoIntoDB(username);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Profile information retrieved'));
});

const toggleFollower = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const userId = req.params.userId;

  const { result, message } = await UserService.toggleFollowerIntoDB(
    accessToken,
    userId
  );

  res.status(status.OK).json(new AppResponse(status.OK, result, message));
});

const getAnalytics = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const result = await UserService.getUserAnalyticsFromDB(userId);

  res
    .status(status.OK)
    .json(
      new AppResponse(status.OK, result, 'Analytics retrieved successfully')
    );
});

export const UserController = {
  signup,
  signin,
  signout,
  changePassword,
  changeImage,
  changeName,
  getUserInfo,
  toggleFollower,
  getAnalytics,
};
