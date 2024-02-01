"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interview_1 = require("../../controllers/AspirantControllers/interview");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, interview_1.getInterviews);
router.get('/pendient', validate_token_1.default, interview_1.getInterviewsPendient);
router.get('/fl', validate_token_1.default, interview_1.getAspirantsFilter);
router.get('/:id', validate_token_1.default, interview_1.getInterviewById);
router.post('/', validate_token_1.default, interview_1.newInterview);
router.put('/:id', validate_token_1.default, interview_1.updateInterview);
router.delete('/:id', validate_token_1.default, interview_1.deleteInterview);
exports.default = router;
