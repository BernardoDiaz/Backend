"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const level_1 = require("../controllers/level");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, level_1.getLevels);
router.get('/:id', validate_token_1.default, level_1.getLevelById);
router.post('/', validate_token_1.default, level_1.newLevel);
router.put('/:id', validate_token_1.default, level_1.updateLevel);
router.delete('/:id', validate_token_1.default, level_1.deleteLevel);
router.get('/degree/:idLevel', validate_token_1.default, level_1.getDegree);
exports.default = router;
