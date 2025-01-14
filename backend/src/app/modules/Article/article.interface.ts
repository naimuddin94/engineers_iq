import { Document, ObjectId } from 'mongoose';

export interface IArticle extends Document {
  author: ObjectId | unknown;
  title: string;
  textarea: string;
  image: string;
  category: string;
  topics: string[];
  claps: ObjectId[];
  comments: ObjectId[];
  views: number;
  shares: number;
  isPremium: boolean;
}
