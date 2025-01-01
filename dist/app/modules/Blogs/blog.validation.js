"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.createBlogValidationSchema = void 0;
// blog.validation.ts
const zod_1 = require("zod");
exports.createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: 'Title is required' }),
        content: zod_1.z.string().min(1, { message: 'Content is required' }),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional().default(true),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
exports.BlogValidation = {
    createBlogValidationSchema: exports.createBlogValidationSchema,
};
