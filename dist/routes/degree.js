"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const degree_1 = require("../controllers/degree");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, degree_1.getDegrees);
router.get('/:id', validate_token_1.default, degree_1.getDegreeById);
router.put('/:id', validate_token_1.default, degree_1.updateDegree);
router.get('/lv/:id', validate_token_1.default, degree_1.getDegreeByLevel);
router.post('/', validate_token_1.default, degree_1.newDegree);
router.delete('/:id', validate_token_1.default, degree_1.deleteDegree);
exports.default = router;
