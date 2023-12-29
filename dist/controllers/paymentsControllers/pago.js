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
const planPagos_1 = require("../../models/paymentsModels/planPagos");
//Metodo Listar
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield pago_1.payment.findAll({
            attributes: ['id', 'id_student', 'totalAmount', 'year', 'datePayment'],
            include: [{
                    model: detallePago_1.detailsPayment,
                    attributes: ['id_payment', 'id_product']
                }, {
                    model: planPagos_1.planPayment,
                    attributes: ['nameFee', 'state']
                }]
        });
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
    const { id_student, totalAmount, year, datePayment, detalle, cuotas } = req.body;
    try {
        // Verificar si el arreglo del detalle está vacío
        if (detalle.length > 0 && cuotas.length > 0) {
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
                    id_product: detalle.id_product,
                    nameProduct: detalle.nameProduct,
                    price: detalle.price
                }));
                yield detallePago_1.detailsPayment.bulkCreate(detalle);
            }), 2000); // delay of 2 seconds
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const cuotas = req.body.cuotas.map((cuotas) => ({
                    id: cuotas.id,
                    id_payment: idGenerete,
                    state: cuotas.state
                }));
                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    yield planPagos_1.planPayment.update({
                        id_payment: id_payment,
                        state: state
                    }, {
                        where: {
                            id: id
                        }
                    });
                }
                res.json({
                    msg: `Pago Registrado con éxito`
                });
            }), 2000);
        }
        else if (detalle.length > 0) {
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
                    id_product: detalle.id_product,
                    nameProduct: detalle.nameProduct,
                    price: detalle.price
                }));
                yield detallePago_1.detailsPayment.bulkCreate(detalle);
                res.json({
                    msg: `Pago Registrado con exito`
                });
            }), 5000); // delay of 5 seconds
        }
        else if (cuotas.length > 0) {
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
                const cuotas = req.body.cuotas.map((cuotas) => ({
                    id: cuotas.id,
                    id_payment: idGenerete,
                    state: cuotas.state
                }));
                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    yield planPagos_1.planPayment.update({
                        id_payment: id_payment,
                        state: state
                    }, {
                        where: {
                            id: id
                        }
                    });
                }
                res.json({
                    msg: `Pago Registrado con éxito`
                });
            }), 2000);
        }
        else {
            res.json({ msg: `No hay productos seleccionados` });
        }
    }
    catch (error) {
        res.json({
            msg: `Error al registrar una compra`,
            error
        });
    }
});
exports.newPayment = newPayment;
