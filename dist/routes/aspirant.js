"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aspirant_1 = require("../controllers/aspirant");
//import validateToken from './validate-token';
const router = (0, express_1.Router)();
router.get('/', aspirant_1.getAspirants);
router.get('/:id', aspirant_1.getAspirantById);
router.post('/', aspirant_1.newAspirant);
router.put('/:id', aspirant_1.updateAspirant);
router.delete('/:id', aspirant_1.deleteAspirant);
exports.default = router;
