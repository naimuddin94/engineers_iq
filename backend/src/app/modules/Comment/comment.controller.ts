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

const clapsOnComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const { accessToken } = req.cookies;
  const result = await CommentService.clapsOnComment(commentId, accessToken);

  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Claps on comment successfully'));
});

export const CommentController = {
  createComment,
  clapsOnComment,
};
