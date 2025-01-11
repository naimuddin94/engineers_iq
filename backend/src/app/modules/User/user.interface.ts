/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, ObjectId } from 'mongoose';
import { TRole } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  username: string;
  image: string;
  password: string;
  role: TRole;
  refreshToken?: string;
  passwordChangedAt?: Date;
  followers: ObjectId[];
  following: ObjectId[];
  verified: boolean;
  premium: boolean;
  lastLogin: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  isUserExists(email: string): Promise<HydratedDocument<IUser, IUserMethods>>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
