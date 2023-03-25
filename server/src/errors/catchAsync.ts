import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { UserDoc } from 'src/models/userModel';

interface ReqParams<
  P extends ParamsDictionary = {},
  Q extends Query = {},
  B = {}
> {
  params?: P;
  query?: Q;
  body?: B;
}

interface IRequest<T extends ReqParams> extends Request {
  params: T['params'];
  query: T['query'];
  body: T['body'];
  user?: UserDoc;
}

type MiddlewareFunction<T extends ReqParams = {}> = (
  req: IRequest<T>,
  res: Response,
  next: NextFunction
) => void;

type RouteFunction<T extends ReqParams = {}> = (
  req: IRequest<T>,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default function <T extends ReqParams>(fn: RouteFunction<T>) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  } as MiddlewareFunction<T>;
}
