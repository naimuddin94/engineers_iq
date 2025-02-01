import status from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import { verifyToken } from '../../lib';
import { AppError, fileUploadOnCloudinary } from '../../utils';
import User from '../User/user.model';
import { articleSearchableFields } from './article.constant';
import { IArticle } from './article.interface';
import Article from './article.model';

// Save new article into the database
const saveArticleIntoDB = async (
  payload: Pick<
    IArticle,
    'title' | 'textarea' | 'category' | 'topics' | 'image' | 'author'
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

  payload.author = user._id;

  if (file) {
    const imageUrl = await fileUploadOnCloudinary(file.buffer);
    if (imageUrl) {
      payload.image = imageUrl;
    }
  }

  return await Article.create(payload);
};

// Update article in the database
const updateArticleInDB = async (
  articleId: string,
  payload: Partial<
    Pick<IArticle, 'title' | 'textarea' | 'category' | 'topics' | 'image'>
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

  const article = await Article.findById(articleId);

  if (!article) {
    throw new AppError(status.NOT_FOUND, 'Article not found');
  }

  // Ensure that the user is the author of the article before updating
  if (String(article.author) !== String(user._id)) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not authorized to update this article'
    );
  }

  // Update fields
  if (payload.title) article.title = payload.title;
  if (payload.textarea) article.textarea = payload.textarea;
  if (payload.category) article.category = payload.category;
  if (payload.topics) article.topics = payload.topics;

  // Handle image upload (if any)
  if (file) {
    const imageUrl = await fileUploadOnCloudinary(file.buffer);
    if (imageUrl) {
      article.image = imageUrl;
    }
  }

  // Save the updated article
  await article.save();
  return article;
};

// Fetch the article from the database
const fetchArticlesFromDB = async (query: Record<string, unknown>) => {
  const articleQuery = new QueryBuilder(
    Article.find().populate([
      {
        path: 'comments',
        select: 'user content claps createdAt updatedAt',
        populate: { path: 'user', select: 'name username image' },
      },
      {
        path: 'author',
        select: 'name username image email premium',
      },
    ]),
    query
  )
    .search(articleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await articleQuery.modelQuery;
  const meta = await articleQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Fetch single article by article id
const fetchArticleFromDB = async (articleId: string) => {
  const article = await Article.findById(articleId).populate('comments');

  if (!article) {
    throw new AppError(status.NOT_FOUND, 'Article not exist!');
  }

  article.views++;
  await article.save();
  return article;
};

const toggleClapIntoDB = async (accessToken: string, articleId: string) => {
  const article = await Article.findById(articleId);

  if (!article) {
    throw new AppError(status.NOT_FOUND, 'Article not found');
  }

  const { id } = await verifyToken(accessToken);

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.BAD_REQUEST, 'User does not exist!');
  }

  // Check if the user has already clapped
  const isClap = article.claps.some(
    (uuid) => uuid.toString() === user._id.toString()
  );

  let result = null;

  if (isClap) {
    result = await Article.findByIdAndUpdate(
      articleId,
      { $pull: { claps: user._id } },
      { new: true }
    );
  } else {
    result = await Article.findByIdAndUpdate(
      articleId,
      { $addToSet: { claps: user._id } },
      { new: true }
    );
  }

  return result;
};

export const ArticleService = {
  saveArticleIntoDB,
  updateArticleInDB,
  fetchArticlesFromDB,
  fetchArticleFromDB,
  toggleClapIntoDB,
};
