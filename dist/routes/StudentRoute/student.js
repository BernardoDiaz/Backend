"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_1 = require("../../controllers/StudentControllers/student");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, student_1.getStudents);
router.get('/:id', validate_token_1.default, student_1.getStudentById);
router.get('/sbd/:IdDegree', validate_token_1.default, student_1.getStudentByDegree);
router.post('/', validate_token_1.default, student_1.newStudent);
router.post('/newR', validate_token_1.default, student_1.newRegistration);
router.put('/:id', validate_token_1.default, student_1.updateStudent);
router.delete('/:id', validate_token_1.default, student_1.deleteStudent);
exports.default = router;
