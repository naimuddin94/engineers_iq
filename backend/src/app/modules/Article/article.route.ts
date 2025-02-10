import { Router } from 'express';
import multer from 'multer';
import { auth, validateRequest } from '../../middlewares';
import { ArticleController } from './article.controller';
import { ArticleValidation } from './article.validation';

const upload = multer();

const router = Router();

router
  .route('/')
  .get(ArticleController.getArticles)
  .post(
    upload.single('image'),
    auth('USER', 'ADMIN'),
    validateRequest(ArticleValidation.createValidationSchema),
    ArticleController.createArticle
  );

router
  .route('/:articleId')
  .patch(
    upload.single('image'),
    auth('USER', 'ADMIN'),
    validateRequest(ArticleValidation.updateValidationSchema),
    ArticleController.updateArticle
  )
  .get(ArticleController.getArticle)
  .delete(auth('ADMIN', 'USER'), ArticleController.deleteArticle);

router
  .route('/claps/:articleId')
  .patch(auth('USER', 'ADMIN'), ArticleController.toggleClap);

export const ArticleRoutes = router;
