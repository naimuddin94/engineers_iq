/* eslint-disable no-unused-vars */
import { Document, HydratedDocument, Model, ObjectId } from 'mongoose';
import { TRole } from './user.constant';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  image: string;
  password: string;
  role: TRole;
  refreshToken?: string | null;
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
  identity: string;
  password: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
