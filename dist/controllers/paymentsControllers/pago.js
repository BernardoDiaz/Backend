"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getotherPayment = exports.otherPayments = exports.newPayment = exports.getPaymentById = exports.getPayment = void 0;
const pago_1 = require("../../models/pago");
const detallePago_1 = require("../../models/paymentsModels/detallePago");
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const student_1 = require("../../models/studentsModels/student");
const otrosPagos_1 = require("../../models/otrosPagos");
const connection_1 = __importDefault(require("../../db/connection"));
//Metodo Listar
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield pago_1.payment.findAll({
            attributes: ['id', 'totalAmount', 'year', 'datePayment'],
            include: [{
                    model: student_1.student,
                    attributes: ['name', 'lastname']
                }, {
                    model: detallePago_1.detailsPayment,
                    attributes: ['id_payment', 'id_product']
                }, {
                    model: planPagos_1.planPayment,
                    attributes: ['nameFee', 'state']
                }],
            order: [['datePayment', 'DESC']]
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
    const { id_payment, id_student, totalAmount, totalDiscount, year, detalle, cuotas } = req.body;
    const fechaActual = new Date();
    try {
        // Verificar si el arreglo del detalle está vacío 
        if (detalle.length > 0 && cuotas.length > 0) {
            pago_1.payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount: totalDiscount,
                year,
                datePayment: fechaActual
            });
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const detalle = req.body.detalle.map((detalle) => ({
                    id_payment: id_payment,
                    id_product: detalle.id_product,
                    nameProduct: detalle.nameProduct,
                    price: detalle.price
                }));
                yield detallePago_1.detailsPayment.bulkCreate(detalle);
            }), 1000); // delay of 2 seconds
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const cuotas = req.body.cuotas.map((cuotas) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    discount: cuotas.discount,
                    state: true
                }));
                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    yield planPagos_1.planPayment.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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
            pago_1.payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount: totalDiscount,
                year,
                datePayment: fechaActual
            });
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const detalle = req.body.detalle.map((detalle) => ({
                    id_payment: id_payment,
                    id_product: detalle.id_product,
                    nameProduct: detalle.nameProduct,
                    price: detalle.price
                }));
                yield detallePago_1.detailsPayment.bulkCreate(detalle);
                res.json({
                    msg: `Pago Registrado con exito`
                });
            }), 1000); // delay of 1 seconds
        }
        else if (cuotas.length > 0) {
            pago_1.payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount: totalDiscount,
                year,
                datePayment: fechaActual
            });
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const cuotas = req.body.cuotas.map((cuotas) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    state: true
                }));
                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    yield planPagos_1.planPayment.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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
const otherPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_payment, year, detalle } = req.body;
    const fechaActual = new Date();
    try {
        // Verificar si el arreglo del detalle está vacío 
        if (detalle.length > 0) {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const detalle = req.body.detalle.map((detalle) => ({
                    id_other_payment: id_payment,
                    id_product: detalle.id_product,
                    nameProduct: detalle.nameProduct,
                    unit_price: detalle.price,
                    discount: detalle.discount,
                    year,
                    datePayment: fechaActual
                }));
                yield otrosPagos_1.otherPayment.bulkCreate(detalle);
                res.json({
                    msg: `Pago Registrado con exito`
                });
            }), 1000); // delay of 1 seconds
        }
        else {
            res.json({ msg: `No hay productos seleccionados` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `Error al registrar una compra`,
            error: error
        });
    }
});
exports.otherPayments = otherPayments;
const getotherPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield otrosPagos_1.otherPayment.findAll({
            attributes: [
                'id_other_payment',
                [connection_1.default.fn('SUM', connection_1.default.col('unit_price')), 'total_unit_price'],
                'year',
                'datePayment'
            ],
            group: ['id_other_payment', 'year', 'datePayment'],
            order: [['datePayment', 'DESC']]
        });
        res.json(list);
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getotherPayment = getotherPayment;
