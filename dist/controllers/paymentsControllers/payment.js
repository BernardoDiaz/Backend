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
exports.updatePayment = exports.deletePayment = exports.newPayment = exports.getPaymentById = exports.getPayment = void 0;
const student_1 = require("../../models/studentsModels/student");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../../models/degree");
const payment_1 = require("../../models/paymentsModels/payment");
//Metodo Listar
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield payment_1.payment.findAll({
            attributes: ['id', 'payment_fee', 'payment_amount', 'date_payments'],
            include: [
                {
                    model: student_1.student,
                    attributes: ['name', 'lastname'],
                    where: { id: connection_1.default.col('student.id') },
                    include: [{
                            model: degree_1.degree,
                            attributes: ['name'],
                            where: { id: connection_1.default.col('student.id_degree') }
                        }]
                }
            ]
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
    const one = yield payment_1.payment.findByPk(id);
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
exports.getPaymentById = getPaymentById;
const newPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student, payment_fee, payment_amount, date_payments } = req.body;
    try {
        payment_1.payment.create({
            id_student,
            payment_fee,
            payment_amount,
            date_payments
        });
        res.json({
            msg: `Cuota ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la Cuota",
            error
        });
    }
});
exports.newPayment = newPayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield payment_1.payment.findOne({ where: { id: id } });
    try {
        if (one) {
            yield payment_1.payment.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La Cuota ya no existe`
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
exports.deletePayment = deletePayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student, payment_fee, payment_amount, date_payments } = req.body;
    const one = yield payment_1.payment.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.update({ id_student, payment_fee, payment_amount, date_payments }, { where: { id: id } });
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
exports.updatePayment = updatePayment;
