"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const SendEmail_1 = require("../../controllers/EmailController/SendEmail");
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, SendEmail_1.SendEmail);
exports.default = router;
