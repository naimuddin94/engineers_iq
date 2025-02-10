/*
 * Title: Engineers IQ
 * Description: It's a blog application for engineers.
 * Author: Md Naim Uddin
 * Date: 11/01/2025
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './app/routes';
import { globalErrorHandler, notFound } from './app/utils';

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: ['https://engineersiq.vercel.app'],
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Engineers IQ server is running :(' });
});

//global error handler
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler);

//handle not found
app.use(notFound);

export default app;
