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
  .patch(
    auth('ADMIN', 'USER'),
    validateRequest(UserValidation.changePasswordValidationSchema),
    UserController.changePassword
  );

router
  .route('/change-image')
  .patch(
    upload.single('image'),
    auth('ADMIN', 'USER'),
    UserController.changeImage
  );

router
  .route('/change-name')
  .patch(auth('ADMIN', 'USER'), UserController.changeName);

router.route('/profile/:username').get(UserController.getUserInfo);

router
  .route('/following/:userId')
  .patch(auth('ADMIN', 'USER'), UserController.toggleFollower);

router.route('/analytics/:userId').get(UserController.getAnalytics);

router.route('/user-status/:userId').get(UserController.getUserStatus);

export const UserRoutes = router;
