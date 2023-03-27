import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordConfirm: string;
  photo?: string;
}

export interface IUserMethods {}

export interface UserDoc
  extends mongoose.HydratedDocument<IUser, IUserMethods> {
  // password: string;
}

export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;