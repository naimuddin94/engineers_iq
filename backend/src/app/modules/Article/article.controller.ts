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

export const ArticleController = {
  createArticle,
};
