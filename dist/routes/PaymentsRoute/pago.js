"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pago_1 = require("../../controllers/paymentsControllers/pago");
//import validateToken from "./validate-token";
const router = (0, express_1.Router)();
router.get('/', pago_1.getPayment);
router.post('/', pago_1.newPayment);
exports.default = router;
