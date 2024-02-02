"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherDegree_1 = require("../../controllers/intermediateControllers/teacherDegree");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/teacher', validate_token_1.default, teacherDegree_1.getTeachers);
router.get('/', validate_token_1.default, teacherDegree_1.getTD);
router.post('/', validate_token_1.default, teacherDegree_1.newTD);
router.delete('/dt/:id', validate_token_1.default, teacherDegree_1.deleteTD);
exports.default = router;
