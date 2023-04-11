import crypto from 'crypto';
import mongoose, { Query } from 'mongoose';
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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
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
userSchema.pre('save', async function (next) {
  // DOES THE PASSWORD NEED HASHING?
  if (!this.isModified('password')) return next();

  // HASH THE PASSWORD
  this.password = await bcrypt.hash(this.password, 12);

  // DELETE PASSWORD CONFIRM, NOW UNNEEDED
  this.passwordConfirm = undefined;

  next();
} as mongoose.PreSaveMiddlewareFunction<UserDoc>);

userSchema.pre(/^find/, function (next) {
  // QUERY ONLY FOR ACTIVE USERS
  this.find({ active: { $ne: false } });
  next();
} as mongoose.PreMiddlewareFunction<mongoose.Query<UserDoc[], UserDoc>>);

// METHODS
userSchema.methods.verifyCorrectPassword = async function (
  passwordString,
  passwordHash
) {
  return await bcrypt.compare(passwordString, passwordHash);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  const MILLISECONDS_IN_A_SECOND = 1000;
  // 1) CHECKED IF PASSWORD HAS EVER BEEN CHANGED
  const hasChangedPasswordBefore = this.passwordLastChangedAt;

  // 2) RETURN BOOLEAN FOR IF JWT ISSUED AFTER A CHANGE
  if (hasChangedPasswordBefore) {
    const lastChangedAtTimestamp =
      this.passwordLastChangedAt.getTime() / MILLISECONDS_IN_A_SECOND;

    return lastChangedAtTimestamp > jwtTimestamp;
  }

  // 1) RETURN DEFAULT
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const TEN_MINS_IN_MILLIS = 10 * 60 * 1000;

  // 1) CREATE PASSWORD RESET TOKEN
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2) ATTACH TOKEN TO USER
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + TEN_MINS_IN_MILLIS;

  // 3) RETURN TOKEN
  return resetToken;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
