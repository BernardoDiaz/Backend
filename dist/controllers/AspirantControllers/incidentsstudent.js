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
exports.updateStudent = exports.deleteStudent = exports.newStudent = exports.getStudentById = exports.getStudents = void 0;
const incidentsstudent_1 = require("../../models/studentsModels/incidentsstudent");
//Metodo Listar
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listIncidents = yield incidentsstudent_1.incidentsstudent.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listIncidents);
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneincident = yield incidentsstudent_1.incidentsstudent.findByPk(id);
    //validacion de existencia
    try {
        if (oneincident) {
            res.json(oneincident);
        }
        else {
            return res.status(404).json({
                msg: `No existe un incidente que concuerde con la busqueda`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getStudentById = getStudentById;
const newStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student, description, severity, date } = req.body;
    try {
        incidentsstudent_1.incidentsstudent.create({
            id_student,
            description,
            severity,
            date
        });
        res.json({
            msg: `El incidente del alumno fue ingresado`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar el incidente",
            error
        });
    }
});
exports.newStudent = newStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneincident = yield incidentsstudent_1.incidentsstudent.findOne({ where: { id: id } });
    try {
        if (oneincident) {
            yield incidentsstudent_1.incidentsstudent.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El incidente no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el incidente`,
            error
        });
    }
});
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student, description, severity } = req.body;
    const oneincident = yield incidentsstudent_1.incidentsstudent.findOne({ where: { id: id } });
    try {
        if (oneincident) {
            yield incidentsstudent_1.incidentsstudent.update({ id_student, description, severity }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro del incidente`,
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
exports.updateStudent = updateStudent;
