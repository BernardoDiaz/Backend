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
exports.updateDegree = exports.deleteDegree = exports.newDegree = exports.getDegreeById = exports.getDegrees = void 0;
const degree_1 = require("../models/degree");
//Metodo Listar
const getDegrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listDegree = yield degree_1.degree.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listDegree);
});
exports.getDegrees = getDegrees;
const getDegreeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneDegree = yield degree_1.degree.findByPk(id);
    //validacion de existencia
    try {
        if (oneDegree) {
            res.json(oneDegree);
        }
        else {
            return res.status(404).json({
                msg: `No existe el grado`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el grado`
        });
    }
});
exports.getDegreeById = getDegreeById;
const newDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id_seccion, id_level } = req.body;
    try {
        yield degree_1.degree.create({
            name: name,
            id_seccion: id_seccion,
            id_level: id_level
        });
        res.json({
            msg: `El ${name} fue creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear el nivel",
            error
        });
    }
});
exports.newDegree = newDegree;
const deleteDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneDegree = yield degree_1.degree.findOne({ where: { id: id } });
    try {
        if (oneDegree) {
            yield degree_1.degree.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El grado ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar, si hay una seccion vinculada al grado, no te sera posible eliminarlo comunicate con el encargado de IT para verificar la situacion`,
            error
        });
    }
});
exports.deleteDegree = deleteDegree;
const updateDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, id_seccion, id_level } = req.body;
    const oneDegree = yield degree_1.degree.findOne({ where: { id: id } });
    try {
        if (oneDegree) {
            yield degree_1.degree.update({ name, id_seccion, id_level }, { where: { id: id } });
            res.json({
                msg: `Grado actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el grado`,
            error
        });
    }
});
exports.updateDegree = updateDegree;
