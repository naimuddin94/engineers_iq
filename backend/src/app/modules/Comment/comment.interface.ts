import { Document, ObjectId } from 'mongoose';

export interface IComment extends Document {
  user: ObjectId | unknown;
  article: ObjectId | unknown;
  content: string;
  claps: ObjectId[];
}
