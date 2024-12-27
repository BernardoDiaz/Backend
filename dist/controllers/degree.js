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
exports.updateDegree = exports.deleteDegree = exports.newDegree = exports.getDegreeById = exports.getDegreeByLevel = exports.getDegrees = void 0;
const degree_1 = require("../models/degree");
const seccion_1 = require("../models/seccion");
const connection_1 = __importDefault(require("../db/connection"));
const level_1 = require("../models/level");
//Metodo Listar
const getDegrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listDegree = yield degree_1.degree.findAll({
        attributes: ['id', 'name', 'priceFee'],
        include: [{
                model: seccion_1.seccion, attributes: ['name'],
                where: { id: connection_1.default.col('seccion.id') },
            }, {
                model: level_1.level, attributes: ['name', 'PriceRegistration'],
                where: { id: connection_1.default.col('level.id') }
            }]
    });
    //Devolvemos la respuesta via JSON
    res.json(listDegree);
});
exports.getDegrees = getDegrees;
const getDegreeByLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Generamos la lista
    const list = yield degree_1.degree.findOne({
        attributes: ['priceFee'],
        include: [{
                model: level_1.level,
                attributes: ['id', 'priceRegistration']
            }],
        where: { id: id }
    });
    // Verificamos que list y list.level existan
    if (list && list.level) {
        const data = {
            id: list.level.id,
            priceRegistration: list.level.priceRegistration,
            priceFee: list.priceFee // Aquí agregamos priceFee a data
        };
        // Devolvemos la respuesta via JSON
        res.json(data);
    }
    else {
        res.status(404).json({ message: 'Degree not found' });
    }
});
exports.getDegreeByLevel = getDegreeByLevel;
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
    const { name, priceFee, id_seccion, id_level } = req.body;
    try {
        yield degree_1.degree.create({
            name: name,
            priceFee: priceFee,
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
    const { name, priceFee, id_seccion, id_level } = req.body;
    const oneDegree = yield degree_1.degree.findOne({ where: { id: id } });
    try {
        if (oneDegree) {
            yield degree_1.degree.update({ name, priceFee, id_seccion, id_level }, { where: { id: id } });
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
