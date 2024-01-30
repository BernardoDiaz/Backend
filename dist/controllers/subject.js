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
exports.newSubject = exports.updateSubject = exports.deleteSubject = exports.getSubjectById = exports.getSubjects = void 0;
const subject_1 = require("../models/subject");
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield subject_1.subject.findAll({ attributes: ['id', 'name'] });
    res.json(list);
});
exports.getSubjects = getSubjects;
const getSubjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield subject_1.subject.findByPk(id);
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
exports.getSubjectById = getSubjectById;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield subject_1.subject.findOne({ where: { id: id } });
    try {
        if (one) {
            yield subject_1.subject.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `Ya no existe`
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
exports.deleteSubject = deleteSubject;
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const one = yield subject_1.subject.findOne({ where: { id: id } });
    try {
        if (one) {
            yield subject_1.subject.update({ name }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe ${name} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
});
exports.updateSubject = updateSubject;
const newSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asignacionGrado = req.body.asignacionGrado.map((materia) => ({
            nameSubject: materia.nameSubject,
            id_degree: materia.id_degree
        }));
        yield subject_1.subject.bulkCreate(asignacionGrado);
        res.json({
            msg: `Materias Asignadas`
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error`,
            error
        });
    }
});
exports.newSubject = newSubject;
