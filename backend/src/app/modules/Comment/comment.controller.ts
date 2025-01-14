import status from 'http-status';
import { AppResponse, asyncHandler } from '../../utils';
import { CommentService } from './comment.service';

const createComment = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const { accessToken } = req.cookies;
  const result = await CommentService.saveCommentIntoDB(
    articleId,
    req.body,
    accessToken
  );

  res
    .status(status.CREATED)
    .json(
      new AppResponse(status.CREATED, result, 'Comment saved successfully')
    );
});

export const CommentController = {
  createComment,
};
