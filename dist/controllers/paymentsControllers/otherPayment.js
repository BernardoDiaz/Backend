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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOther_Payment = exports.deleteOther_Payment = exports.newOther_Payment = exports.getOther_PaymentById = exports.getOther_Payment = void 0;
const otherPayment_1 = require("../../models/paymentsModels/otherPayment");
//Metodo Listar
const getOther_Payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield otherPayment_1.other_payment.findAll();
        // Devolvemos la respuesta en formato JSON
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getOther_Payment = getOther_Payment;
const getOther_PaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield otherPayment_1.other_payment.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getOther_PaymentById = getOther_PaymentById;
const newOther_Payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_fee, date_payments, payment_amount } = req.body;
    try {
        otherPayment_1.other_payment.create({
            name_fee,
            date_payments,
            payment_amount
        });
        res.json({
            msg: `Pago ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la Pago",
            error
        });
    }
});
exports.newOther_Payment = newOther_Payment;
const deleteOther_Payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield otherPayment_1.other_payment.findOne({ where: { id: id } });
    try {
        if (one) {
            yield otherPayment_1.other_payment.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El Pago ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
});
exports.deleteOther_Payment = deleteOther_Payment;
const updateOther_Payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name_fee, date_payments, payment_amount } = req.body;
    const one = yield otherPayment_1.other_payment.findOne({ where: { id: id } });
    try {
        if (one) {
            yield otherPayment_1.other_payment.update({ name_fee, date_payments, payment_amount }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro de Cuota`,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
});
exports.updateOther_Payment = updateOther_Payment;
