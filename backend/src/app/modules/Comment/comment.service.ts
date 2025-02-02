import status from 'http-status';
import mongoose, { ObjectId } from 'mongoose';
import { verifyToken } from '../../lib';
import { AppError } from '../../utils';
import Article from '../Article/article.model';
import User from '../User/user.model';
import { IComment } from './comment.interface';
import Comment from './comment.model';

const saveCommentIntoDB = async (
  articleId: string,
  payload: Partial<IComment>,
  token: string
) => {
  const article = await Article.findById(articleId);

  if (!article) {
    throw new AppError(status.NOT_FOUND, 'Article not found');
  }

  const { id } = await verifyToken(token);

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  payload.user = user._id;
  payload.article = article._id;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const [comment] = await Comment.create([payload], { session });

    const result = await Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment._id } },
      { session, new: true }
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong during save comment'
    );
  }
};

const clapsOnComment = async (commentId: string, token: string) => {
  const comment = await Comment.findById(commentId);

  console.log('from 62', commentId);

  if (!comment) {
    throw new AppError(status.NOT_FOUND, 'Comment not exist!');
  }

  const { id } = await verifyToken(token);

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User  not exist!');
  }

  // Toggle clap using atomic operations
  const hasClapped = comment.claps.includes(user._id as ObjectId);

  const update = hasClapped
    ? { $pull: { claps: user._id } }
    : { $addToSet: { claps: user._id } };

  const updatedComment = await Comment.findByIdAndUpdate(commentId, update, {
    new: true,
  });

  return updatedComment;
};

const deleteCommentIntoDB = async (accessToken: string, commentId: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(status.NOT_FOUND, 'Comment not found');
  }

  const { id } = await verifyToken(accessToken);

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Comment.findByIdAndDelete(commentId, { session });
    const result = await Article.findByIdAndUpdate(
      comment.article,
      { $pull: { comments: comment._id } },
      { session, new: true }
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch {
    await session.abortTransaction();
    session.endSession();
  }
};

const updateCommentIntoDB = async (
  accessToken: string,
  commentId: string,
  content: string
) => {
  const { id } = await verifyToken(accessToken);

  const isOwner = await Comment.exists({ _id: commentId, user: id });

  if (!isOwner) {
    throw new AppError(status.BAD_REQUEST, 'You are not allowed');
  }

  const result = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );

  return result;
};

export const CommentService = {
  saveCommentIntoDB,
  clapsOnComment,
  deleteCommentIntoDB,
  updateCommentIntoDB,
};
