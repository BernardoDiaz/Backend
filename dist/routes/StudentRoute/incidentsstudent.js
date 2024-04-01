"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incidentsstudent_1 = require("../../controllers/StudentControllers/incidentsstudent");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, incidentsstudent_1.getIncidents);
router.get('/:id', validate_token_1.default, incidentsstudent_1.getIncidentById);
router.get('/ed/:id', validate_token_1.default, incidentsstudent_1.getById);
router.post('/', validate_token_1.default, incidentsstudent_1.newIncident);
router.put('/:id', validate_token_1.default, incidentsstudent_1.updateIncident);
router.delete('/:id', validate_token_1.default, incidentsstudent_1.deleteIncident);
exports.default = router;
