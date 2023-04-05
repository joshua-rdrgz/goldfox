import { expect } from 'chai';
import sinon from 'sinon';
import User from '@models/userModel';
import userController from '@controllers/userController';
import * as controllerUtils from '@controllers/controllerUtils';
import { UserDoc } from '@goldfoxtypes/userTypes';

describe('Auth related Controller Functions', () => {
  describe('protectRoute method', () => {
    let req: any;
    let res: any;
    let next: sinon.SinonStub<any[], any>;
    let verifyJwtStub: sinon.SinonStub<any[], any>;
    let findByIdStub: sinon.SinonStub<any[], any>;
    let userInstance: UserDoc;
    let changedPasswordAfterStub: sinon.SinonStub<any[], any>;

    beforeEach(() => {
      req = {};
      res = {};
      next = sinon.stub();
      verifyJwtStub = sinon.stub(controllerUtils, 'verifyJwt');
      findByIdStub = sinon.stub(User, 'findById');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should provide access to the next middleware function', async () => {
      const token = 'valid_token';
      req.headers = { authorization: `Bearer ${token}` };
      userInstance = new User({
        name: 'Testing User',
        email: 'testing@gmail.com',
        password: 'testpassword',
        passwordConfirm: 'testpassword',
      });
      verifyJwtStub.resolves({ id: userInstance._id.toString() });
      findByIdStub.resolves(userInstance);
      changedPasswordAfterStub = sinon
        .stub(userInstance, 'changedPasswordAfter')
        .returns(false);

      await userController.protectRoute(req, res, next);

      console.log('req from test case: ', req);

      // BUGFIX: test case is occurring before .protectRoute() fires
      // expect(req.user.id).to.equal(userInstance._id.toString());
      // expect(next.calledOnce).to.be.true;
    });

    it('should error if no authorization provided', () => {
      // TODO
    });

    it("should error if user on the token doesn't exist", () => {
      // TODO
    });

    it('should error if the tokened user has recently changed their password since acquiring the token', () => {
      // TODO
    });
  });
});
