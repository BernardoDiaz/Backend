"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generatePDF_1 = require("../../controllers/ReportsController/generatePDF");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/:id', validate_token_1.default, generatePDF_1.viewTicket);
router.post('/', validate_token_1.default, generatePDF_1.newTicket);
router.get('/other/:id', validate_token_1.default, generatePDF_1.viewTicket_other);
router.post('/other', validate_token_1.default, generatePDF_1.newTicket_other);
exports.default = router;
