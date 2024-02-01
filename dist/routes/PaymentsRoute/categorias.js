"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias_1 = require("../../controllers/paymentsControllers/categorias");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, categorias_1.getCategory);
router.post('/', validate_token_1.default, categorias_1.newCategory);
router.put('/:id', validate_token_1.default, categorias_1.updateCategory);
router.delete('/:id', validate_token_1.default, categorias_1.deleteCategory);
exports.default = router;
