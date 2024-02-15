"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const qualifications_1 = require("../controllers/qualifications");
const router = (0, express_1.Router)();
router.get('/gq/:IdDegree', validate_token_1.default, qualifications_1.GenerateQualification);
router.get('/ptd/:IdDegree', validate_token_1.default, qualifications_1.periodToDegree);
router.get('/registro/:IdDegree/:IdSubject/:period', validate_token_1.default, qualifications_1.searchSubject);
router.get('/vf/:IdDegree', validate_token_1.default, qualifications_1.verifyQualification);
router.put('/', validate_token_1.default, qualifications_1.updateQualification);
exports.default = router;
