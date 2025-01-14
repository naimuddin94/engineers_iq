import status from 'http-status';
import mongoose from 'mongoose';
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

    await Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return comment;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Something went wrong during save comment'
    );
  }
};

export const CommentService = {
  saveCommentIntoDB,
};
