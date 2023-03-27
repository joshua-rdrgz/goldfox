import { expect } from 'chai';
import User from '@models/userModel';
import deleteDBDocuments from 'test/setup.test';

describe('User Schema Custom Validators', () => {
  afterEach(() => deleteDBDocuments(User));

  describe('email property', () => {
    it('should throw an error with invalid email', async () => {
      try {
        await User.create({
          email: 'invalidemail',
        });
      } catch ({ errors }) {
        expect(errors.email.message).to.equal('Please enter a valid email.');
      }
    });
    it('should throw an error if email is already in use', async () => {
      try {
        await User.create({
          name: 'Test User',
          email: 'test@testing.com',
          password: 'testpassword',
          passwordConfirm: 'testpassword',
        });
        await User.create({
          name: 'Test User',
          email: 'test@testing.com',
          password: 'testpassword',
          passwordConfirm: 'testpassword',
        });
      } catch ({ errors }) {
        expect(errors.email.message).to.equal(
          'This email is already in use, please pick another one.'
        );
      }
    });
  });

  describe('passwordConfirm property', () => {
    it('should throw an error if passwordConfirm does not match password', async () => {
      try {
        await User.create({
          name: 'Test User',
          email: 'test@testing.com',
          password: 'testpassword',
          passwordConfirm: 'wrongtestpassword',
        });
      } catch ({ errors }) {
        expect(errors.passwordConfirm.message).to.equal(
          'Password and Confirm Password do not match.'
        );
      }
    });
  });
});
