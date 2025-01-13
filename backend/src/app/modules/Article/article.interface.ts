import { Document, ObjectId } from 'mongoose';

export interface IArticle extends Document {
  author: ObjectId;
  title: string;
  textarea: string;
  images: string[];
  category: string;
  topics: string[];
  claps: ObjectId[];
  comments: ObjectId[];
  views: number;
  shares: number;
  isPremium: boolean;
}
