import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import request from 'supertest';
import app from 'src/app';
import User from '@models/userModel';
import deleteDBDocuments from 'test/setup.test';
import { TestApp, post } from 'test/testUtils';
import {
  IFailedResponse,
  ISuccessfulResponseAuth,
  ISuccessfulResponseAuthUser,
} from '@goldfoxtypes/authTypes';

describe('User Routes', () => {
  let testApp: TestApp;
  before(() => {
    testApp = request(app);
  });
  afterEach(() => deleteDBDocuments(User));

  describe('/api/v1/users/createUser', () => {
    it('POST - should create a user if all attributes correct', async () => {
      const userObj = {
        name: 'Test User',
        email: 'test@testing.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      };
      const { statusCode, body } = await post<ISuccessfulResponseAuthUser>(
        testApp,
        '/api/v1/users/createUser',
        userObj
      );

      const userFromResponse = body.data.user;
      const userFromDatabase = await User.findById(userFromResponse._id);

      expect(statusCode).to.equal(201);
      expect(userFromResponse._id.toString()).to.equal(
        userFromDatabase._id.toString()
      );
      expect(await User.countDocuments()).to.equal(1);
    });
  });

  describe('/api/v1/users/loginUser', () => {
    it('POST - should give token with correct credentials', async () => {
      const { body: bodyCreateUser } = await post<ISuccessfulResponseAuthUser>(
        testApp,
        '/api/v1/users/createUser',
        {
          name: 'Testing User',
          email: 'testing@gmail.com',
          password: 'testpassword',
          passwordConfirm: 'testpassword',
        }
      );

      const { statusCode: statusCodeLoginUser, body: bodyLoginUser } =
        await post<ISuccessfulResponseAuth>(
          testApp,
          '/api/v1/users/loginUser',
          {
            email: 'testing@gmail.com',
            password: 'testpassword',
          }
        );

      const loginDecoded = jwt.decode(bodyLoginUser.token) as jwt.JwtPayload;

      expect(statusCodeLoginUser).to.equal(200);
      expect(bodyLoginUser.status).to.equal('success');
      expect(bodyLoginUser.token).to.exist;
      expect(loginDecoded.id).to.equal(bodyCreateUser.data.user._id);
    });

    it('POST - should fail if email or password not given', async () => {
      await post<ISuccessfulResponseAuthUser>(
        testApp,
        '/api/v1/users/createUser',
        {
          name: 'Testing User',
          email: 'testing@gmail.com',
          password: 'testpassword',
          passwordConfirm: 'testpassword',
        }
      );

      const { statusCode, body } = await post<IFailedResponse>(
        testApp,
        '/api/v1/users/loginUser',
        {
          email: 'testing@gmail.com',
        }
      );

      expect(statusCode).to.equal(400);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Please provide both email and password.');
    });

    it('POST - should fail if incorrect email or password was given', async () => {
      await post<ISuccessfulResponseAuthUser>(
        testApp,
        '/api/v1/users/createUser',
        {
          name: 'Testing User',
          email: 'testing@gmail.com',
          password: 'testpassword',
          passwordConfirm: 'testpassword',
        }
      );

      const { statusCode, body } = await post<IFailedResponse>(
        testApp,
        '/api/v1/users/loginUser',
        {
          email: 'testing@gmail.com',
          password: 'wrongpassword',
        }
      );

      expect(statusCode).to.equal(401);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal(
        'Incorrect email or password.  Please try again.'
      );
    });
  });
});
