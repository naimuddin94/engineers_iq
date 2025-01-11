import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../utils';
import message from './message';

interface ITokenUser {
  id: string;
  email: string;
  role: string;
  image: string;
}

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as ITokenUser;

    return decoded;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, message.unauthorized);
  }
};

export default verifyToken;
