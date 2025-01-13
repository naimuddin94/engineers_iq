import status from 'http-status';
import { verifyToken } from '../../lib';
import { AppError, fileUploadOnCloudinary } from '../../utils';
import User from '../User/user.model';
import { IArticle } from './article.interface';
import Article from './article.model';

// Save new user information in the database
const saveArticleIntoDB = async (
  payload: Pick<
    IArticle,
    'title' | 'textarea' | 'category' | 'topics' | 'images'
  >,

  // eslint-disable-next-line no-undef
  file: Express.Multer.File | undefined,
  token: string
) => {
  let user = null;

  if (token) {
    const { id } = await verifyToken(token);
    user = await User.findById(id);
  }

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not exists');
  }

  //! For email verifications
  //   if (!user.verified) {
  //     throw new AppError(status.BAD_REQUEST, 'Your email not verified');
  //   }

  if (file) {
    const imageUrl = await fileUploadOnCloudinary(file.buffer);
    if (imageUrl) {
      payload.images.push(imageUrl);
    }
  }

  return await Article.create(payload);
};

export const ArticleService = {
  saveArticleIntoDB,
};
