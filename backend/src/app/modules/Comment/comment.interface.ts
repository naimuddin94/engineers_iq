import { Document, ObjectId } from 'mongoose';

export interface IComment extends Document {
  user: ObjectId;
  article: ObjectId;
  content: string;
  claps: ObjectId[];
}
