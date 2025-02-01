import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { CommentController } from './comment.controller';
import { CommentValidation } from './comment.validation';

const router = Router();

router
  .route('/:articleId')
  .post(
    auth('ADMIN', 'USER'),
    validateRequest(CommentValidation.createValidationSchema),
    CommentController.createComment
  );

router
  .route('/claps/:commentId')
  .post(auth('ADMIN', 'USER'), CommentController.clapsOnComment);

router
  .route('/remove/:commentId')
  .delete(auth('ADMIN', 'USER'), CommentController.deleteComment);

export const CommentRoutes = router;
