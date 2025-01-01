// interfaces/IBlogPost.ts
import { Types } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  isDeleted: boolean;
}
