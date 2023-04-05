import User from '@models/userModel';
import catchAsync from '@catchAsync';
import AppError from '@appError';
import { signToken, verifyJwt } from './controllerUtils';
import {
  IRequestCreateUser,
  IRequestLoginUser,
  ISuccessfulResponseAuth,
  ISuccessfulResponseAuthUser,
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
};
