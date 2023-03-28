import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { validateUniqueProperty } from './modelUtils';
import {
  IUser,
  IUserMethods,
  UserDoc,
  UserModel,
} from '@goldfoxtypes/userTypes';

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
    select: false,
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

// MIDDLEWARE
userSchema.pre('save', async function(next) {
  // DOES THE PASSWORD NEED HASHING?
  if (!this.isModified('password')) return next();

  // HASH THE PASSWORD
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD CONFIRM, NOW UNNEEDED
  this.passwordConfirm = undefined;

  next();
} as mongoose.PreSaveMiddlewareFunction<UserDoc>);

// METHODS
userSchema.methods.verifyCorrectPassword = async function(passwordString, passwordHash) {
  return await bcrypt.compare(passwordString, passwordHash);
}

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
