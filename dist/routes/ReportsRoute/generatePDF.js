"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generatePDF_1 = require("../../controllers/ReportsController/generatePDF");
const router = (0, express_1.Router)();
router.get('/:id', generatePDF_1.viewTicket);
router.post('/', generatePDF_1.newTicket);
exports.default = router;
