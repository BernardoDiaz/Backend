"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_1 = require("../controllers/subject");
const seccion_1 = require("../controllers/seccion");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, subject_1.getSubjects);
router.get('/:id', validate_token_1.default, seccion_1.getSeccionById);
router.post('/', validate_token_1.default, subject_1.newSubject);
router.put('/:id', validate_token_1.default, subject_1.updateSubject);
router.delete('/:id', validate_token_1.default, subject_1.deleteSubject);
exports.default = router;
