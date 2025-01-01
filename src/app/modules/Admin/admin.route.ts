import express from 'express';
import { auth } from '../../middleware/auth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('Admin'), AdminController.blockUser);
router.delete('/blogs/:id', auth('Admin'), AdminController.deleteBlogById);

export const adminRoutes = router;
