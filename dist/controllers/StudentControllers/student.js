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
exports.updateStudent = exports.deleteStudent = exports.newStudent = exports.getStudentById = exports.getStudents = void 0;
const student_1 = require("../../models/studentsModels/student");
const degree_1 = require("../../models/degree");
const connection_1 = __importDefault(require("../../db/connection"));
const seccion_1 = require("../../models/seccion");
//Metodo Listar
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const listaEstudiantes = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname'],
            include: [
                {
                    model: degree_1.degree,
                    attributes: ['name'],
                    where: { id: connection_1.default.col('degree.id') },
                    include: [
                        {
                            model: seccion_1.seccion,
                            attributes: ['name'],
                            where: { id: connection_1.default.col('degree.id_seccion') }
                        }
                    ]
                }
            ]
        });
        // Devolvemos la respuesta en formato JSON
        res.json(listaEstudiantes);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield student_1.student.findByPk(id);
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
exports.getStudentById = getStudentById;
const newStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, id_degree, year } = req.body;
    try {
        student_1.student.create({
            name: name,
            lastname: lastname,
            id_degree: id_degree,
            year: year
        });
        res.json({
            msg: `El alumno ${name + '' + lastname} fue ingresado`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un alumno",
            error
        });
    }
});
exports.newStudent = newStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield student_1.student.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El alumno ya no existe`
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
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lastname, id_degree } = req.body;
    const one = yield student_1.student.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.update({ name, lastname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro del alumno: ${name + '' + lastname} `,
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
