import { promisify } from 'util';
import { CookieOptions, Response } from 'express';
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
  // 1) CREATE TOKEN
  const token = signToken(user._id.toString());

  // 2) CONFIGURE COOKIE
  const ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRATION) * ONE_DAY_IN_MILLIS),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // 3) SEND COOKIE TO CLIENT
  res.cookie('jwt', token, cookieOptions);

  // 4) REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;

  // 5) SEND RESPONSE TO CLIENT
  const json: ISuccessfulResponseAuth = {
    status: 'success',
    token,
  };
  if (sendUser) json.data = { user };

  res.status(statusCode).json(json);
};

export const filterObject = (object: {}, ...allowedFields: string[]) => {
  const filteredObject = {};

  for (const property of Object.keys(object)) {
    if (allowedFields.includes(property)) {
      filteredObject[property] = object[property];
    }
  }

  return filteredObject;
};
