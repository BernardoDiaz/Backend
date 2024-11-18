"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchs_1 = require("../../controllers/searchController/searchs");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, searchs_1.searchStudents);
router.get('/full', validate_token_1.default, searchs_1.searchStudents_Full);
router.get('/registration', validate_token_1.default, searchs_1.searchRegistration);
router.get('/:id_student', validate_token_1.default, searchs_1.searchPlanPayment);
exports.default = router;
