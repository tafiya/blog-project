"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/Admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/admin',
        route: admin_route_1.adminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
