"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchs_1 = require("../../controllers/searchController/searchs");
//import validateToken from "./validate-token";
const router = (0, express_1.Router)();
router.get('/', searchs_1.searchStudents);
exports.default = router;
