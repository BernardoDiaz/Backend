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
exports.updateLevel = exports.deleteLevel = exports.newLevel = exports.getLevelById = exports.getLevels = void 0;
const level_1 = require("../models/level");
const getLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listLevel = yield level_1.level.findAll({
        attributes: ['id', 'name', 'priceRegistration', 'priceFee'],
        order: [['id', 'ASC']]
    });
    res.json(listLevel);
});
exports.getLevels = getLevels;
const getLevelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneLevel = yield level_1.level.findByPk(id);
    //validacion de existencia
    try {
        if (oneLevel) {
            res.json(oneLevel);
        }
        else {
            return res.status(404).json({
                msg: `No existe el nivel academico`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el nivel academico`
        });
    }
});
exports.getLevelById = getLevelById;
const newLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, priceRegistration, priceFee } = req.body;
    //Validar nombre unico de nivel
    const namevalid = yield level_1.level.findOne({ where: { name: name } });
    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe un nivel registrado como ${name}`
        });
    }
    ;
    //Guardando nivel en bd
    try {
        yield level_1.level.create({
            name,
            priceRegistration,
            priceFee
        });
        res.json({
            msg: `El nivel ${name} creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear el nivel",
            error
        });
    }
});
exports.newLevel = newLevel;
const deleteLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneLevel = yield level_1.level.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield level_1.level.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El nivel academico, ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el nivel academico`,
            error
        });
    }
});
exports.deleteLevel = deleteLevel;
const updateLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, priceRegistration, priceFee } = req.body;
    const oneLevel = yield level_1.level.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield level_1.level.update({ name, priceRegistration, priceFee }, { where: { id: id } });
            res.json({
                msg: `Nivel academico, actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe el nivel academico: ${name} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el nivel academico,`,
            error
        });
    }
});
exports.updateLevel = updateLevel;
