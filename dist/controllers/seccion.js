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
exports.updateSeccion = exports.deleteSeccion = exports.newSeccion = exports.getSeccionById = exports.getSeccions = void 0;
const seccion_1 = require("../models/seccion");
const getSeccions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSeccion = yield seccion_1.seccion.findAll({ attributes: ['id', 'name'] });
    res.json(listSeccion);
});
exports.getSeccions = getSeccions;
const getSeccionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneSeccion = yield seccion_1.seccion.findByPk(id);
    //validacion de existencia
    try {
        if (oneSeccion) {
            res.json(oneSeccion);
        }
        else {
            return res.status(404).json({
                msg: `No existe la seccion`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar la seccion`
        });
    }
});
exports.getSeccionById = getSeccionById;
const newSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const namevalid = yield seccion_1.seccion.findOne({ where: { name: name } });
    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe una seccion registrada como ${name}`
        });
    }
    //Guardar Seccion en bd
    try {
        yield seccion_1.seccion.create({
            name: name
        });
        res.json({
            msg: `Seccion ${name} creada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear la seccion",
            error
        });
    }
});
exports.newSeccion = newSeccion;
const deleteSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneSeccion = yield seccion_1.seccion.findOne({ where: { id: id } });
    try {
        if (oneSeccion) {
            yield seccion_1.seccion.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La seccion, ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `La seccion esta asignada no es posible eliminarla`,
            error
        });
    }
});
exports.deleteSeccion = deleteSeccion;
const updateSeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const oneSeccion = yield seccion_1.seccion.findOne({ where: { id: id } });
    try {
        if (oneSeccion) {
            yield seccion_1.seccion.update({ name }, { where: { id: id } });
            res.json({
                msg: `La seccion, se actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No se puede editar la seccion: ${name} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la seccion`,
            error
        });
    }
});
exports.updateSeccion = updateSeccion;
