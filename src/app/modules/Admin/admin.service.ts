import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Blog } from '../Blogs/blog.model';
import { User } from '../user/user.model';

const blockUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
};

const deleteBlogById = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  const result = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const AdminService = {
  blockUserById,
  deleteBlogById,
};
