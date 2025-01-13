import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(5, 'Title must be at least 5 characters')
      .max(100, 'Title must be under 100 characters'),
    textarea: z
      .string({
        required_error: 'Textarea is required',
      })
      .min(100, 'Textarea must be at least 100 characters')
      .max(100000, 'Textarea must be under 100k characters'),
    category: z.string({
      required_error: 'Category is required',
    }),
    topics: z
      .array(z.string().min(1, 'Topic name must have at least 1 character'))
      .min(1, 'At least one topic is required')
      .max(10, 'You can only specify up to 10 topics'),
  }),
});

const updateValidationSchema = z.object({
  body: createValidationSchema.shape.body.partial(),
});

export const ArticleValidation = {
  createValidationSchema,
  updateValidationSchema,
};
