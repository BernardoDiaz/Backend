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
exports.searchStudentById = exports.searchStudents = void 0;
const student_1 = require("../../models/studentsModels/student");
const matricula_1 = require("../../models/paymentsModels/matricula");
const degree_1 = require("../../models/degree");
const seccion_1 = require("../../models/seccion");
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const searchStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actualYear = new Date().getFullYear();
    try {
        const list = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname'],
            where: { state: 'Activo' },
            include: [{
                    model: matricula_1.registration,
                    attributes: [],
                    where: { year: actualYear }
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
const searchStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield student_1.student.findByPk(id, {
        attributes: ['id', 'name', 'lastname'],
        include: [{
                model: matricula_1.registration,
                attributes: ['id_degree', 'id_level', 'year'],
                //incluir grado
                include: [{
                        model: degree_1.degree,
                        attributes: ['name'],
                        //incluir seccion
                        include: [{
                                model: seccion_1.seccion,
                                attributes: ['name']
                            }]
                    }]
            }, {
                model: planPagos_1.planPayment,
                attributes: ['nameFee', 'price'],
                where: { state: false }
                //incluir otra tabla
            }]
    });
    try {
        if (one) {
            res.json(one);
        }
        else {
            res.status(404).json({ msg: 'No existe un registro' });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: `Error al buscar`,
            error
        });
    }
});
exports.searchStudentById = searchStudentById;
