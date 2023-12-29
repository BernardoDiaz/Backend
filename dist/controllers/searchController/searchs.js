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
exports.searchPaymentPlanByStudent = exports.searchCategoryById = exports.searchStudentById = exports.searchStudents = void 0;
const student_1 = require("../../models/studentsModels/student");
const matricula_1 = require("../../models/paymentsModels/matricula");
const degree_1 = require("../../models/degree");
const seccion_1 = require("../../models/seccion");
const productos_1 = require("../../models/paymentsModels/productos");
const categorias_1 = require("../../models/paymentsModels/categorias");
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const searchStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const actualYear = new Date().getFullYear();
    try {
        const list = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname'],
            where: { state: 'Activo' },
            include: [{
                    model: matricula_1.registration,
                    attributes: ['id_degree', 'id_level', 'year'],
                    where: { year: actualYear },
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
const searchCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idCategory = req.params.idCategory;
        const list = yield categorias_1.category.findAll({
            attributes: ['nameCategory'],
            include: [{
                    model: productos_1.product,
                    attributes: ['id', 'nameProduct', 'price'],
                    where: { id_category: idCategory }
                }]
        });
        res.json(list);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
});
exports.searchCategoryById = searchCategoryById;
const searchPaymentPlanByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actualYear = new Date().getFullYear();
        const idStudent = req.params.idStudent;
        const list = yield matricula_1.registration.findAll({
            attributes: ['id_student', 'year'],
            where: { id_student: idStudent, year: actualYear },
            include: [{
                    model: student_1.student,
                    attributes: ['name', 'lastname'],
                    include: [{
                            model: planPagos_1.planPayment,
                            attributes: ['id', 'nameFee', 'datePayment', 'dateExpiration', 'price'],
                            where: { state: false }
                        }]
                }],
        });
        res.json(list);
    }
    catch (error) {
        res.status(500).json({
            error: `Error interno del servidor`
        });
    }
});
exports.searchPaymentPlanByStudent = searchPaymentPlanByStudent;
