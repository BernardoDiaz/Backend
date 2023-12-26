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
exports.updateRegistrationActive = exports.updateRegistration = exports.deleteRegistration = exports.newRegistration = exports.getAlumnosOffRegistration = exports.getRegistrationById = exports.getRegistration = void 0;
const student_1 = require("../../models/studentsModels/student");
const registration_1 = require("../../models/paymentsModels/registration");
//Metodo Listar
const getRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const list = yield registration_1.registration.findAll();
        // Devolvemos la respuesta en formato JSON
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getRegistration = getRegistration;
const getRegistrationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield registration_1.registration.findByPk(id);
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
exports.getRegistrationById = getRegistrationById;
//matriculas pendientes
const getAlumnosOffRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield student_1.student.findAll({ where: { state: 'Matrícula Pendiente' } });
    // Devolvemos la respuesta en formato JSON
    res.json(list);
});
exports.getAlumnosOffRegistration = getAlumnosOffRegistration;
const newRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student, date_registration, payment_type, payment_amount } = req.body;
    try {
        registration_1.registration.create({
            id_student: id_student,
            date_registration: date_registration,
            payment_type: payment_type,
            payment_amount: payment_amount
        });
        res.json({
            msg: `Matricula ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la matricula",
            error
        });
    }
});
exports.newRegistration = newRegistration;
const deleteRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield registration_1.registration.findOne({ where: { id: id } });
    try {
        if (one) {
            yield registration_1.registration.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La matricula ya no existe`
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
exports.deleteRegistration = deleteRegistration;
const updateRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student, date_registration, payment_type, payment_amount, } = req.body;
    const one = yield registration_1.registration.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.update({ id_student, date_registration, payment_type, payment_amount }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro de matricula`,
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
exports.updateRegistration = updateRegistration;
const updateRegistrationActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const state = 'Activo';
    const one = yield student_1.student.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.update({ state }, { where: { id: id } });
            res.json();
        }
        else {
            return res.status(404).json();
        }
    }
    catch (error) {
        return res.status(404).json();
    }
});
exports.updateRegistrationActive = updateRegistrationActive;
