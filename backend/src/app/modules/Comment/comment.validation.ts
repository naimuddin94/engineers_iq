import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    content: z.string({ required_error: 'Content is required' }),
  }),
});

export const CommentValidation = {
  createValidationSchema,
};
