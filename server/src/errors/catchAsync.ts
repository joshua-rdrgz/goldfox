import {
  ReqParams,
  RouteFunction,
  MiddlewareFunction,
} from '@goldfoxtypes/generalTypes';

export default function <T extends ReqParams>(fn: RouteFunction<T>) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  } as MiddlewareFunction<T>;
}
