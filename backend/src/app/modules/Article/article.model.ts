import mongoose from 'mongoose';
import { IArticle } from './article.interface';

const articleSchema = new mongoose.Schema<IArticle>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        claps: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
          },
        ],
        createdAt: {
          type: Date,
          required: true,
        },
        updatedAt: {
          type: Date,
          required: false,
        },
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
