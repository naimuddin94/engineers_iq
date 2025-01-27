import { CookieOptions } from 'express';
import status from 'http-status';
import { AppResponse, asyncHandler, options } from '../../utils';
import { UserService } from './user.service';

const signup = asyncHandler(async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const { accessToken: requestAccessToken } = req.cookies;
  const { response, accessToken, refreshToken } =
    await UserService.saveUserIntoDB(payload, file, requestAccessToken);

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

const getUserInfo = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const result = await UserService.getProfileInfoIntoDB(username);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Profile information retrieved'));
});

export const UserController = {
  signup,
  signin,
  signout,
  changePassword,
  getUserInfo,
};
