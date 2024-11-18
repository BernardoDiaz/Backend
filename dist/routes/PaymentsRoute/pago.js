"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pago_1 = require("../../controllers/paymentsControllers/pago");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
//import validateToken from "./validate-token";
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, pago_1.getPayment);
router.post('/', validate_token_1.default, pago_1.newPayment);
router.post('/other', validate_token_1.default, pago_1.otherPayments);
router.get('/v-other', validate_token_1.default, pago_1.getotherPayment);
exports.default = router;
