// blog routes
import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth('Admin', 'User'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getBlog);
router.delete('/:id', auth('Admin', 'User'), BlogControllers.deleteBlog);
router.patch('/:id', auth('Admin', 'User'), BlogControllers.updateBlog);

export const BlogRoutes = router;
