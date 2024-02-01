"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultation_1 = require("../../controllers/AspirantControllers/consultation");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, consultation_1.getConsultations);
router.get('/pendient', validate_token_1.default, consultation_1.getConsultationsPendient);
router.get('/fl', validate_token_1.default, consultation_1.getAspirantsFilter);
router.get('/:id', validate_token_1.default, consultation_1.getConsultationById);
router.post('/', validate_token_1.default, consultation_1.newConsultation);
router.put('/:id', validate_token_1.default, consultation_1.updateConsultation);
router.delete('/:id', validate_token_1.default, consultation_1.deleteConsultation);
exports.default = router;
