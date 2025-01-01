import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['Admin', 'User']).default('User'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
