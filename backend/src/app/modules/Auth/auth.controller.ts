import { CookieOptions } from 'express';
import httpStatus from 'http-status';
import { message } from '../../lib';
import { AppResponse, asyncHandler, options } from '../../utils';
import { AuthService } from './auth.service';

const createUser = asyncHandler(async (req, res) => {
  const { response, accessToken, refreshToken } =
    await AuthService.saveUserIntoDB(req);

  res
    .status(httpStatus.CREATED)
    .cookie('refreshToken', refreshToken, options as CookieOptions)
    .cookie('accessToken', accessToken, options as CookieOptions)
    .json(
      new AppResponse(
        httpStatus.CREATED,
        { ...response?.toObject(), accessToken, refreshToken },
        message.user_created
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { data, accessToken, refreshToken } = await AuthService.loginUser(
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
        message.login
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;

  await AuthService.logoutUser(accessToken);

  res
    .status(httpStatus.OK)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json(new AppResponse(httpStatus.OK, null, message.logout));
});

const changePassword = asyncHandler(async (req, res) => {
  const accessToken = req.cookies?.accessToken;
  const payload = req.body;

  await AuthService.changePasswordIntoDB(payload, accessToken);

  res
    .status(httpStatus.OK)
    .json(new AppResponse(httpStatus.OK, null, message.password_changed));
});

export const AuthController = {
  createUser,
  login,
  logout,
  changePassword,
};
