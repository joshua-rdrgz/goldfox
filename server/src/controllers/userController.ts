import jwt from 'jsonwebtoken';
import User from '@models/userModel';
import catchAsync from '@catchAsync';
import {
  IRequestCreateUser,
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
};
