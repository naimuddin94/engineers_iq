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

const deleteComment = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const commentId = req.params.commentId;
  const result = await CommentService.deleteCommentIntoDB(
    accessToken,
    commentId
  );
  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Comment removed successfully'));
});

const updateComment = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const commentId = req.params.commentId;
  const content = req.body.content;
  const result = await CommentService.updateCommentIntoDB(
    accessToken,
    commentId,
    content
  );
  res
    .status(status.OK)
    .json(new AppResponse(status.OK, result, 'Comment update successfully'));
});

export const CommentController = {
  createComment,
  clapsOnComment,
  deleteComment,
  updateComment,
};
