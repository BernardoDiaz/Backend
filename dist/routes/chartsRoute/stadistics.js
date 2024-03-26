"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const stadistics_1 = require("../../controllers/chartsController/stadistics");
const router = (0, express_1.Router)();
router.get('/matricula/:idStudent', validate_token_1.default, stadistics_1.matricula);
router.get('/pago/:idStudent', validate_token_1.default, stadistics_1.pagos);
router.get('/pagado/:idStudent', validate_token_1.default, stadistics_1.pagado);
router.get('/pendiente/:idStudent', validate_token_1.default, stadistics_1.pendientePago);
router.get('/mora/:idStudent', validate_token_1.default, stadistics_1.mora);
router.get('/notas/:idStudent', validate_token_1.default, stadistics_1.notas);
exports.default = router;
