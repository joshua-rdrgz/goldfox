import { Router } from 'express';
import userController from '@controllers/userController';

const router = Router();

// api/v1/users/createUser
router.route('/createUser').post(userController.createUser);

// api/v1/users/loginUser
router.route('/loginUser').post(userController.loginUser);

// api/v1/users/forgotPassword
router.route('/forgotPassword').post(userController.forgotPassword);

// api/v1/users/resetPassword
router.route('/resetPassword/:token').patch(userController.resetPassword);

// api/v1/users/updatePassword
router
  .route('/updatePassword')
  .patch(userController.protectRoute, userController.updatePassword);

// api/v1/users/updateUser
router
  .route('/updateUser')
  .patch(userController.protectRoute, userController.updateUserData);

export default router;
