import { Router } from 'express';
import userController from '@controllers/userController';

const router = Router();

// api/v1/users/createUser
router.route('/createUser').post(userController.createUser);

// api/v1/users/loginUser
router.route('/loginUser').post(userController.loginUser);

export default router;