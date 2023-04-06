import { IUser, UserDoc } from '@goldfoxtypes/userTypes';

export interface IRequestCreateUser {
  body: {
    name: IUser['name'];
    email: IUser['email'];
    role: IUser['role'];
    password: IUser['password'];
    passwordConfirm: IUser['passwordConfirm'];
    photo?: IUser['photo'];
  };
}

export interface IRequestLoginUser {
  body: {
    email: IUser['email'];
    password: IUser['password'];
  };
}

export interface IRequestForgotPassword {
  body: {
    email: IUser['email'];
  }
}

export interface ISuccessfulResponseAuth {
  status: 'success',
  token: string;
}

export interface ISuccessfulResponseAuthUser {
  status: 'success';
  token: string;
  data: {
    user: UserDoc;
  };
}

export interface IFailedResponse {
  status: 'fail';
  message: string;
}
