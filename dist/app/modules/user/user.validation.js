"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        role: zod_1.z.enum(['Admin', 'User']).default('User'),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
