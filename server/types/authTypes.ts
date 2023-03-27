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

export interface ISuccessfulResponseAuthUser {
  status: 'success';
  token: string;
  data: {
    user: UserDoc;
  };
}
