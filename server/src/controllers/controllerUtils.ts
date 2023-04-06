import { promisify } from 'util';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDoc } from '@goldfoxtypes/userTypes';
import { ISuccessfulResponseAuth } from '@goldfoxtypes/authTypes';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const verifyJwt: (
  token: string,
  secret: jwt.Secret
) => Promise<jwt.JwtPayload> = promisify(jwt.verify);

export const createAndSendToken = (
  user: UserDoc,
  statusCode: number,
  res: Response,
  sendUser = false
) => {
  const token = signToken(user._id.toString());

  const json: ISuccessfulResponseAuth = {
    status: 'success',
    token,
  };
  if (sendUser) json.data = { user };

  res.status(statusCode).json(json);
};
