"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const admisionsFees_1 = require("../../controllers/AspirantControllers/aspirantPayments/admisionsFees");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, admisionsFees_1.getAspirantsFees);
router.get('/:id', validate_token_1.default, admisionsFees_1.getAspirantFeesById);
router.post('/', validate_token_1.default, admisionsFees_1.newAspirantFee);
router.put('/:id', validate_token_1.default, admisionsFees_1.updateAspirantFees);
router.delete('/:id', validate_token_1.default, admisionsFees_1.deleteAspirantFees);
exports.default = router;
