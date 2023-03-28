import jwt from 'jsonwebtoken';
import User from '@models/userModel';
import catchAsync from '@catchAsync';
import AppError from '@appError';
import {
  IRequestCreateUser,
  IRequestLoginUser,
  ISuccessfulResponseAuth,
  ISuccessfulResponseAuthUser,
} from '@goldfoxtypes/authTypes';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export default {
  createUser: catchAsync<IRequestCreateUser>(async (req, res, _) => {
    const { name, email, role, password, passwordConfirm, photo } = req.body;

    const user = await User.create({
      name,
      email,
      role,
      password,
      passwordConfirm,
      photo,
    });

    const token = signToken(user._id.toString());

    res.status(201).json({
      status: 'success',
      token,
      data: { user },
    } as ISuccessfulResponseAuthUser);
  }),

  loginUser: catchAsync<IRequestLoginUser>(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) CHECK IF EMAIL AND PASSWORD WERE RECEIVED
    if (!email || !password) {
      return next(new AppError('Please provide both email and password.', 400));
    }

    // 2) CHECK IF USER INFO IS CORRECT
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.verifyCorrectPassword(password, user.password))) {
      return next(
        new AppError('Incorrect email or password.  Please try again.', 401)
      );
    }

    // 3) SEND TOKEN TO CLIENT
    const token = signToken(user._id.toString());
    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    } as ISuccessfulResponseAuth);
  }),
};
