import crypto from 'crypto';
import User from '@models/userModel';
import catchAsync from '@catchAsync';
import AppError from '@appError';
import { verifyJwt, createAndSendToken } from './controllerUtils';
import sendEmail from '@utils/email';
import {
  IRequestCreateUser,
  IRequestLoginUser,
  IRequestForgotPassword,
  IRequestResetPassword,
} from '@goldfoxtypes/authTypes';
import { IUser } from '@goldfoxtypes/userTypes';
import { MiddlewareFunction } from '@goldfoxtypes/generalTypes';

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

    createAndSendToken(user, 201, res, true);
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
    createAndSendToken(user, 200, res);
  }),

  protectRoute: catchAsync(async (req, _, next) => {
    // 1) GET AUTH JWT TOKEN, CHECK IT EXISTS IN REQUEST
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ').pop();
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in.  Please log in to get access to this resource.',
          401
        )
      );
    }

    // 2) VERIFY TOKEN IS VALID -- NOT EXPIRED && NOT MANIPULATED
    const decoded = await verifyJwt(token, process.env.JWT_SECRET);

    // 3) VERIFY USER ON TOKEN STILL EXISTS
    const tokenedUser = await User.findById(decoded.id);

    if (!tokenedUser) {
      return next(
        new AppError(
          'This user no longer exists.  Please create an account to gain access.',
          401
        )
      );
    }

    // 4) VERIFY USER'S PASSWORD HASN'T CHANGED SINCE TOKEN WAS ISSUED
    if (tokenedUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          `This user's password has recently changed.  Please log in to gain access to this resource.`,
          401
        )
      );
    }

    // ASSIGN USER ON REQ OBJECT AND GRANT ACCESS TO PROTECTED ROUTE
    req.user = tokenedUser;
    console.log('req from .protectRoute() : ', req);
    next();
  }),

  restrictRouteTo: (...roles: IUser['role'][]) => {
    const checkRolesToProhibit: MiddlewareFunction = (req, _, next) => {
      const { role } = req.user;
      if (!roles.includes(role)) {
        return next(
          new AppError(
            'You do not have permission to perform this action.',
            403
          )
        );
      }
    };
    return checkRolesToProhibit;
  },

  forgotPassword: catchAsync<IRequestForgotPassword>(async (req, res, next) => {
    const { email } = req.body;

    // 1) GET USER BASED ON POST-ED EMAIL
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new AppError(
          'No user with this email address was found, please try another one.',
          404
        )
      );
    }

    // 2) CREATE RESET TOKEN
    const passwordResetToken = user.createPasswordResetToken();
    await user.save({ validateModifiedOnly: true });

    // 3) SEND TOKEN TO EMAIL
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${passwordResetToken}`;
    const message = `Forgot your password?  Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid 10 minutes only!)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateModifiedOnly: true });

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500
        )
      );
    }
  }),

  resetPassword: catchAsync<IRequestResetPassword>(async (req, res, next) => {
    const { token } = req.params;
    const { password, passwordConfirm } = req.body;

    // 1) GET USER BASED ON POST-ED TOKEN
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) CHECK IF USER EXISTS / TOKEN HASN'T EXPIRED
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    // 3) RESET PASSWORD
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateModifiedOnly: true });

    // 4) LOG USER IN (SEND JWT)
    createAndSendToken(user, 200, res);
  }),
};
