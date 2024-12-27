"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentdata_1 = require("../../controllers/StudentControllers/studentdata");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, studentdata_1.getStudentDatas);
router.get('/:id', validate_token_1.default, studentdata_1.getStudentDataById);
router.post('/', validate_token_1.default, studentdata_1.newStudentData);
router.put('/:id', validate_token_1.default, studentdata_1.updateStudentData);
router.delete('/:id', validate_token_1.default, studentdata_1.deleteStudentData);
exports.default = router;
