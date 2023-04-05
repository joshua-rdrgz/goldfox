import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const verifyJwt: (
  token: string,
  secret: jwt.Secret
) => Promise<jwt.JwtPayload> = promisify(jwt.verify);
