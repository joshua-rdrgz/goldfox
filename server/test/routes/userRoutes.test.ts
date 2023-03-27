import { expect } from 'chai';
import request from 'supertest';
import app from 'src/app';
import User from '@models/userModel';
import deleteDBDocuments from 'test/setup.test';
import { TestApp, post } from 'test/testUtils';
import { ISuccessfulResponseAuthUser } from '@goldfoxtypes/authTypes';

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
});
