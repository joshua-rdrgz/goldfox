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

export interface IRequestResetPassword {
  params: {
    token: string;
  }
  body: {
    password: IUser['password'];
    passwordConfirm: IUser['passwordConfirm'];
  }
}

export interface IRequestUpdatePassword {
  body: {
    password: IUser['password'];
    passwordUpdate: IUser['password'];
    passwordConfirmUpdate: IUser['passwordConfirm'];
  }
}

export interface IRequestUpdateUser {
  body: {
    password?: null;
    passwordConfirm?: null;
    name: IUser['name'];
    email: IUser['email'];
  }
}

export interface ISuccessfulResponseAuth {
  status: 'success';
  token: string;
  data?: {
    user: UserDoc;
  };
}

export interface IFailedResponse {
  status: 'fail';
  message: string;
}
