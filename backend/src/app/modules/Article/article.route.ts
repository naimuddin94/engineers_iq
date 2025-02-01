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
  .get(ArticleController.getArticle);

router
  .route('/claps/:articleId')
  .patch(auth('USER', 'ADMIN'), ArticleController.toggleClap);

router
  .route('/comments/:id')
  .post(auth('USER', 'ADMIN'), ArticleController.addComment)
  .delete(auth('USER', 'ADMIN'), ArticleController.deleteComment);

export const ArticleRoutes = router;
