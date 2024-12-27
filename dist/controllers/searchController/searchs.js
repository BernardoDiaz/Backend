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
exports.searchPlanPayment_Asp = exports.searchPlanPayment = exports.searchRegistration = exports.searchStudents_Asp = exports.searchStudents_Full = exports.searchStudents = void 0;
const student_1 = require("../../models/studentsModels/student");
const matricula_1 = require("../../models/paymentsModels/matricula");
const degree_1 = require("../../models/degree");
const seccion_1 = require("../../models/seccion");
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const aspirant_1 = require("../../models/aspirantsModels/aspirant");
const pagosAspirante_1 = require("../../models/paymentsModels/pagosAspirante");
const searchStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actualYear = new Date().getFullYear();
    try {
        const list = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'state'],
            where: {
                state: 'Activo'
            },
            include: [{
                    model: matricula_1.registration,
                    attributes: ['id_degree', 'id_level', 'year'],
                    where: { year: actualYear },
                    include: [{
                            model: degree_1.degree,
                            attributes: ['name'],
                            include: [{
                                    model: seccion_1.seccion,
                                    attributes: ['name']
                                }]
                        }]
                }]
        });
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.searchStudents = searchStudents;
const searchStudents_Full = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actualYear = new Date().getFullYear();
    try {
        const list = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'state'],
            include: [{
                    model: matricula_1.registration,
                    attributes: ['id_degree', 'id_level', 'year'],
                    where: { year: actualYear },
                    include: [{
                            model: degree_1.degree,
                            attributes: ['name'],
                            include: [{
                                    model: seccion_1.seccion,
                                    attributes: ['name']
                                }]
                        }]
                }]
        });
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.searchStudents_Full = searchStudents_Full;
const searchStudents_Asp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield aspirant_1.aspirant.findAll({
            attributes: ['id', 'aspirant_fullname', 'manager_email'],
            include: [{
                    model: degree_1.degree,
                    attributes: ['name'],
                    include: [{
                            model: seccion_1.seccion,
                            attributes: ['name']
                        }]
                }]
        });
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.searchStudents_Asp = searchStudents_Asp;
const searchRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actualYear = new Date().getFullYear();
    try {
        const list = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname'],
        });
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.searchRegistration = searchRegistration;
const searchPlanPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student } = req.params;
    try {
        const one = yield planPagos_1.planPayment.findAll({ where: { id_student: id_student, state: false },
            attributes: ['id', 'nameFee', 'price'] });
        res.json(one);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error para traer el plan de pagos' });
    }
});
exports.searchPlanPayment = searchPlanPayment;
const searchPlanPayment_Asp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_aspirant } = req.params;
    try {
        const one = yield pagosAspirante_1.paymentAspirant.findAll({ where: { id_aspirant: id_aspirant, state: false },
            attributes: ['id', 'nameFee', 'price'] });
        res.json(one);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error para traer el plan de pagos' });
    }
});
exports.searchPlanPayment_Asp = searchPlanPayment_Asp;
