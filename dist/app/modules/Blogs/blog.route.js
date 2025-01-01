"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
// blog routes
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)('Admin', 'User'), (0, validateRequest_1.validateRequest)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get('/', blog_controller_1.BlogControllers.getAllBlogs);
router.get('/:id', blog_controller_1.BlogControllers.getBlog);
router.delete('/:id', (0, auth_1.auth)('Admin', 'User'), blog_controller_1.BlogControllers.deleteBlog);
router.patch('/:id', (0, auth_1.auth)('Admin', 'User'), blog_controller_1.BlogControllers.updateBlog);
exports.BlogRoutes = router;
