import { Router } from 'express';
import { ArticleRoutes } from '../modules/Article/article.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/articles',
    route: ArticleRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
