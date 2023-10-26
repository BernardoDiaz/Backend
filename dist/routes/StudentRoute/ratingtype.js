"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingtype_1 = require("../../controllers/StudentControllers/ratingtype");
//import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/', ratingtype_1.getRatingTypes);
router.get('/:id', ratingtype_1.getRatingTypeById);
router.post('/', ratingtype_1.newRatingType);
router.put('/:id', ratingtype_1.updateRatingType);
router.delete('/:id', ratingtype_1.deleteRatingType);
exports.default = router;