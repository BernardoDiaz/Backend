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
exports.updateStudentData = exports.deleteStudentData = exports.newStudentData = exports.getStudentDataById = exports.getStudentDatas = void 0;
const studentdata_1 = require("../../models/studentsModels/studentdata");
//Metodo Listar 
const getStudentDatas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listStudents = yield studentdata_1.studentdata.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listStudents);
});
exports.getStudentDatas = getStudentDatas;
const getStudentDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield studentdata_1.studentdata.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe un alumno`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el alumno`
        });
    }
});
exports.getStudentDataById = getStudentDataById;
const newStudentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student } = req.body;
    try {
        studentdata_1.studentdata.create({
            id_student
        });
        res.json({
            msg: `La informacion del alumno fue ingresado`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la informacion del alumno",
            error
        });
    }
});
exports.newStudentData = newStudentData;
const deleteStudentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield studentdata_1.studentdata.findOne({ where: { id: id } });
    try {
        if (one) {
            yield studentdata_1.studentdata.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La informacion del alumno ya no existe`
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
exports.deleteStudentData = deleteStudentData;
const updateStudentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student } = req.body;
    const one = yield studentdata_1.studentdata.findOne({ where: { id: id } });
    try {
        if (one) {
            yield studentdata_1.studentdata.update({ id_student }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe informacion`,
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
exports.updateStudentData = updateStudentData;
