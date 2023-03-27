import { Router } from 'express';
import userController from '@controllers/userController';

const router = Router();

// api/v1/users/createUser
router.route('/createUser').post(userController.createUser);

export default router;