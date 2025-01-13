import { Document, ObjectId } from 'mongoose';

interface IComment {
  user: ObjectId;
  content: string;
  claps: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticle extends Document {
  author: ObjectId;
  title: string;
  textarea: string;
  images: string[];
  category: string;
  topics: string[];
  claps: ObjectId[];
  comments: IComment[];
  views: number;
  shares: number;
  isPremium: boolean;
}
