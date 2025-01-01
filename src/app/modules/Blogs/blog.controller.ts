// blog.controller.ts
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res, next) => {
  const result = await BlogServices.createBlogsIntoDB(req.body, req.user);
  sendResponse(res, {
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
const getAllBlogs = catchAsync(async (req, res, next) => {
  const result = await BlogServices.getALLBlogsFromDB(req.query);
  sendResponse(res, {
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
// get a single Blog
const getBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogServices.getBlogFromDB(id);
  sendResponse(res, {
    message: 'Blog fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogFromDB(id, req.body, req.user);
  sendResponse(res, {
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id, req.user);
  sendResponse(res, {
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
