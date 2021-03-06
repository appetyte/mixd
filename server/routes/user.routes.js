import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as AuthController from '../controllers/auth.controller';

const router = new Router();
router
  .route('/signup')
  .post(
    UserController.validateNewUser,
    UserController.signup,
    AuthController.login,
  );

// FIXME: validate email on login
router.route('/login').post(AuthController.login);

router.route('/auth/google').get(AuthController.googleLogin);
router.route('/auth/google/callback').get(AuthController.googleLoginCallback);

router.route('/logout').get(AuthController.logout);

export default router;
