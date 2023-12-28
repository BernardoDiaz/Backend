"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPayment = exports.getPaymentById = exports.getPayment = void 0;
const shortid = __importStar(require("shortid"));
const pago_1 = require("../../models/paymentsModels/pago");
const detallePago_1 = require("../../models/paymentsModels/detallePago");
//Metodo Listar
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield pago_1.payment.findAll();
        // Devolvemos la respuesta en formato JSON
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getPayment = getPayment;
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield pago_1.payment.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getPaymentById = getPaymentById;
const newPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //constantes de pago
    const { id_student, totalAmount, year, datePayment } = req.body;
    try {
        //generamos el id de la compra
        const idGenerete = shortid.generate();
        pago_1.payment.create({
            id: idGenerete,
            id_student,
            totalAmount,
            year,
            datePayment
        });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const detalle = req.body.detalle.map((detalle) => ({
                id_payment: idGenerete,
                id_product: detalle.id_product
            }));
            yield detallePago_1.detailsPayment.bulkCreate(detalle);
            res.json({
                msg: `Pago Registrado`
            });
        }), 5000); // delay of 5 seconds
    }
    catch (error) {
        res.json({
            msg: `Error al registrar una compra`,
            error
        });
    }
});
exports.newPayment = newPayment;