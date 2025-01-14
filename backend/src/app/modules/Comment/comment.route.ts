import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { CommentController } from './comment.controller';
import { CommentValidation } from './comment.validation';

const router = Router();

router
  .route('/:articleId')
  .post(
    validateRequest(CommentValidation.createValidationSchema),
    CommentController.createComment
  );

export const CommentRoutes = router;
