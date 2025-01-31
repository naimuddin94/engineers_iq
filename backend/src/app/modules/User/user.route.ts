import { Router } from 'express';
import multer from 'multer';
import { auth, validateRequest } from '../../middlewares';
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
    auth('ADMIN', 'USER'),
    validateRequest(UserValidation.changePasswordValidationSchema),
    UserController.changePassword
  );

router
  .route('/change-image')
  .post(
    upload.single('image'),
    auth('ADMIN', 'USER'),
    UserController.changeImage
  );

router
  .route('/change-name')
  .post(auth('ADMIN', 'USER'), UserController.changeName);

router.route('/profile/:username').get(UserController.getUserInfo);

router
  .route('/following/:userId')
  .patch(auth('ADMIN', 'USER'), UserController.toggleFollower);

export const UserRoutes = router;
