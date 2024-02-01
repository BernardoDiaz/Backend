"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../../controllers/paymentsControllers/productos");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
//import validateToken from "./validate-token";
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, productos_1.getProduct);
router.post('/', validate_token_1.default, productos_1.newProduct);
router.put('/:id', validate_token_1.default, productos_1.updateProduct);
router.delete('/:id', validate_token_1.default, productos_1.deleteProduct);
exports.default = router;
