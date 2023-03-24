import mongoose from 'mongoose';
import validator from 'validator';
import { validateUniqueProperty } from './modelUtils';

interface IUser {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordConfirm: string;
  photo?: string;
}

interface IUserMethods {}

export interface UserDoc
  extends mongoose.HydratedDocument<IUser, IUserMethods> {
  // password: string;
} // exported for catchAsync potentially having UserDoc on req parameter

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
    validate: [
      {
        validator: function (email: string) {
          return validator.isEmail(email);
        },
        message: `Please enter a valid email.`,
      },
      {
        validator: async function (email: string): Promise<boolean> {
          return await validateUniqueProperty<IUser, IUserMethods>(email, User);
        },
        message: `This email is already in use, please pick another one.`,
      },
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    minlength: [8, `A user's password must be at least 8 characters.`],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must confirm the password they want.'],
    validate: {
      validator: function (this: UserDoc, passwordConfirm: string) {
        return passwordConfirm === this.password;
      },
      message: 'Password and Confirm Password do not match.',
    },
  },
  photo: String,
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
