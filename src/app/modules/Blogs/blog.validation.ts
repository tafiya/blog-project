// blog.validation.ts
import { z } from 'zod';
export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    author: z.string().optional(),
    isPublished: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
  }),
});
export const BlogValidation = {
  createBlogValidationSchema,
};
