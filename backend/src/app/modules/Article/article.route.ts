import { Router } from 'express';
import multer from 'multer';
import { validateRequest } from '../../middlewares';
import { ArticleController } from './article.controller';
import { ArticleValidation } from './article.validation';

const upload = multer();

const router = Router();

router
  .route('/')
  .post(
    upload.single('image'),
    validateRequest(ArticleValidation.createValidationSchema),
    ArticleController.createArticle
  );

export const ArticleRoutes = router;
