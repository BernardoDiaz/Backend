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
exports.subjectByDegree = exports.deleteTD = exports.newTD = exports.getTD = exports.getTeachers = void 0;
const teacherDegree_1 = require("../../models/intermediateModels/teacherDegree");
const teacher_1 = require("../../models/teacher");
const degree_1 = require("../../models/degree");
const seccion_1 = require("../../models/seccion");
const level_1 = require("../../models/level");
const subject_1 = require("../../models/subject");
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield teacher_1.teacher.findAll({
            attributes: ['id', 'name', 'lastname', 'state'],
            include: [{
                    model: level_1.level,
                    attributes: ['name']
                }]
        });
        res.json(list);
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
});
exports.getTeachers = getTeachers;
const getTD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield teacherDegree_1.DegreeAssignment.findAll({
            attributes: ['id', 'year'],
            include: [{
                    model: teacher_1.teacher,
                    attributes: ['name', 'lastname']
                }, {
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
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
});
exports.getTD = getTD;
const newTD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_teacher, id_degree, year } = req.body;
    try {
        yield teacherDegree_1.DegreeAssignment.create({
            id_teacher,
            id_degree,
            year
        });
        res.json({
            msg: ` Grado asignado exitosamente`
        });
    }
    catch (error) {
        res.json({
            msg: 'No se puedo asignar el grado',
            error
        });
    }
});
exports.newTD = newTD;
const deleteTD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield teacherDegree_1.DegreeAssignment.findOne({ where: { id: id } });
    try {
        if (one) {
            yield teacherDegree_1.DegreeAssignment.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El aspirante ya no existe`
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
exports.deleteTD = deleteTD;
const subjectByDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    try {
        const list = yield teacherDegree_1.DegreeAssignment.findAll({
            attributes: ['id_degree'],
            where: { id_teacher: idTeacher },
            include: [{
                    model: degree_1.degree, attributes: ['name'],
                    include: [{ model: seccion_1.seccion, attributes: ['name'] },
                        { model: subject_1.subject, attributes: ['id', 'namesubject'] }]
                }]
        });
        res.json(list);
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error`,
            error
        });
    }
});
exports.subjectByDegree = subjectByDegree;
