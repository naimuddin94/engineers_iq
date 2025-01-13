import mongoose from 'mongoose';
import { IArticle } from './article.interface';

const articleSchema = new mongoose.Schema<IArticle>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    textarea: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: String,
        required: true,
      },
    ],
    claps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: [0, 'views count cannot be negative'],
    },
    shares: {
      type: Number,
      default: 0,
      min: [0, 'shares count cannot be negative'],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
