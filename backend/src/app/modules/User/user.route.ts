import { Router } from 'express';
import multer from 'multer';
import { validateRequest } from '../../middlewares';
import { UserValidation } from '../User/user.validation';
import { UserController } from './user.controller';

const upload = multer();

const router = Router();

router
  .route('/signup')
  .post(
    upload.single('image'),
    validateRequest(UserValidation.createUserValidationSchema),
    UserController.signup
  );

router
  .route('/signin')
  .post(
    validateRequest(UserValidation.loginUserValidationSchema),
    UserController.signin
  );

router.route('/signout').post(UserController.signout);

router
  .route('/change-password')
  .post(
    validateRequest(UserValidation.changePasswordValidationSchema),
    UserController.changePassword
  );

export const UserRoutes = router;
