"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seccion_1 = require("../controllers/seccion");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, seccion_1.getSeccions);
router.get('/:id', validate_token_1.default, seccion_1.getSeccionById);
router.post('/', validate_token_1.default, seccion_1.newSeccion);
router.put('/:id', validate_token_1.default, seccion_1.updateSeccion);
router.delete('/:id', validate_token_1.default, seccion_1.deleteSeccion);
exports.default = router;
