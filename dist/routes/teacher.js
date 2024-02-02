"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_1 = require("../controllers/teacher");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, teacher_1.getTeacher);
router.get('/state/:id', validate_token_1.default, teacher_1.stateTeacher);
router.get('/ag/:id_levelSearch', validate_token_1.default, teacher_1.getDegreeTeacher);
router.post('/', validate_token_1.default, teacher_1.newTeacher);
router.delete('/:id', validate_token_1.default, teacher_1.deleteTeacher);
exports.default = router;
