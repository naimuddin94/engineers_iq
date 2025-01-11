import { Router } from 'express';
import multer from 'multer';
import { validateRequest, validateRequestCookies } from '../../middlewares';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';

const upload = multer();

const router = Router();

router
  .route('/signup')
  .post(
    upload.single('image'),
    validateRequest(UserValidation.createUserValidationSchema),
    AuthController.createUser
  );

router
  .route('/signin')
  .post(
    validateRequest(UserValidation.loginUserValidationSchema),
    AuthController.login
  );

router
  .route('/signout')
  .post(
    validateRequestCookies(UserValidation.refreshTokenValidationSchema),
    AuthController.logout
  );

router
  .route('/change-password')
  .post(
    validateRequest(UserValidation.changePasswordValidationSchema),
    AuthController.changePassword
  );

export const authRouters = router;
