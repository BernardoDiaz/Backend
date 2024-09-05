"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aspirant_1 = require("../../controllers/AspirantControllers/aspirant");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, aspirant_1.getAspirants);
router.get('/viewCase', validate_token_1.default, aspirant_1.viewCaseAspirant);
router.get('/:id', validate_token_1.default, aspirant_1.getAspirantById);
router.post('/', validate_token_1.default, aspirant_1.newAspirant);
router.post('/newStudent', validate_token_1.default, aspirant_1.newStudents_Asp);
router.put('/:id', validate_token_1.default, aspirant_1.updateAspirant);
router.delete('/:id', validate_token_1.default, aspirant_1.deleteAspirant);
exports.default = router;
