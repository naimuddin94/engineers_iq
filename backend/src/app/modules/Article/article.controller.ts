import httpStatus from 'http-status';
import { AppResponse, asyncHandler } from '../../utils';
import { ArticleService } from './article.service';

const createArticle = asyncHandler(async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const { accessToken } = req.cookies;
  const result = await ArticleService.saveArticleIntoDB(
    payload,
    file,
    accessToken
  );

  res
    .status(httpStatus.CREATED)
    .json(
      new AppResponse(httpStatus.CREATED, result, 'Article saved successfully')
    );
});

const updateArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const payload = req.body;
  const file = req.file;
  const { accessToken } = req.cookies;
  const result = await ArticleService.updateArticleInDB(
    articleId,
    payload,
    file,
    accessToken
  );

  res
    .status(httpStatus.OK)
    .json(
      new AppResponse(httpStatus.OK, result, 'Article update successfully')
    );
});

const getArticles = asyncHandler(async (req, res) => {
  const { result, meta } = await ArticleService.fetchArticlesFromDB(req.query);

  res
    .status(httpStatus.OK)
    .json(
      new AppResponse(
        httpStatus.OK,
        result,
        'Article retrieved successfully',
        meta
      )
    );
});

export const ArticleController = {
  createArticle,
  updateArticle,
  getArticles,
};
