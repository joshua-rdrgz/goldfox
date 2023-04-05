import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordConfirm: string;
  passwordLastChangedAt?: Date;
  photo?: string;
}

export interface IUserMethods {
  verifyCorrectPassword(this: UserDoc, passwordString: string, passwordHash: string): Promise<boolean>;
  changedPasswordAfter(this: UserDoc, jwtTimestamp: number): boolean;
}

export interface UserDoc
  extends mongoose.HydratedDocument<IUser, IUserMethods> {
  // password: string;
}

export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;