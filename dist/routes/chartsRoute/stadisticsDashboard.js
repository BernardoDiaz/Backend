"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const stadisticsDashboard_1 = require("../../controllers/chartsController/stadisticsDashboard");
const router = (0, express_1.Router)();
router.get('/cantAlumn/:idLevel', validate_token_1.default, stadisticsDashboard_1.PorNiver_Alumnos);
router.get('/payAlumn/:idLevel', validate_token_1.default, stadisticsDashboard_1.PorNivel_Pagado);
router.get('/notpayAlumn/:idLevel', validate_token_1.default, stadisticsDashboard_1.PorNivel_Pendiente);
router.get('/moraAlumn/:idLevel', validate_token_1.default, stadisticsDashboard_1.PorNivel_Mora);
router.get('/dayPayments', validate_token_1.default, stadisticsDashboard_1.PagosDelDia);
router.get('/cuotas', validate_token_1.default, stadisticsDashboard_1.PagosCuotas);
router.get('/productos', validate_token_1.default, stadisticsDashboard_1.PagosProductos);
router.get('/masvendidos', validate_token_1.default, stadisticsDashboard_1.MasVendidosP);
router.get('/cantidadvendida', validate_token_1.default, stadisticsDashboard_1.categoriasVentas);
exports.default = router;
