// blog.service.ts
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { blogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogsIntoDB = async (payload: TBlog, userData: JwtPayload) => {
  const user = await User.isUserExistsByCustomId(userData.userEmail);
  if (user.isBlocked) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to create blog',
    );
  }
  payload.author = user._id;
  const result = (await Blog.create(payload)).populate('author');
  return result;
};
// get all Blogs data
const getALLBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchableFields)
    .sort()
    .filter();

  const result = await blogQuery.modelQuery;
  return result;
};
// get a single data
const getBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  if (result == null) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not exist');
  }
  return result;
};
const updateBlogFromDB = async (
  id: string,
  payload: Partial<TBlog>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByCustomId(userData.userEmail);
  const isBlogsExists = await Blog.findById(id);
  if (!isBlogsExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This blog is not found !');
  }
  if (isBlogsExists.author.toString() !== user._id.toString()) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to update this blog',
    );
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteBlogFromDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByCustomId(userData.userEmail);
  const isBlogsExists = await Blog.findById(id);
  if (!isBlogsExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This blog is not found !');
  }
  if (isBlogsExists.author.toString() !== user._id.toString()) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to delete this blog',
    );
  }
  await Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
export const BlogServices = {
  createBlogsIntoDB,
  getALLBlogsFromDB,
  getBlogFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
