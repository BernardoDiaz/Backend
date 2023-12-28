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
exports.updateCategory = exports.deleteCategory = exports.newCategory = exports.getCategory = void 0;
const categorias_1 = require("../../models/paymentsModels/categorias");
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield categorias_1.category.findAll({ attributes: ['id', 'nameCategory'] });
        res.json(list);
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
});
exports.getCategory = getCategory;
const newCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameCategory } = req.body;
    const namevalid = yield categorias_1.category
        .findOne({ where: { nameCategory: nameCategory } });
    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe ${nameCategory}`
        });
    }
    ;
    try {
        yield categorias_1.category.create({
            nameCategory
        });
        res.json({
            msg: `La categoria ${nameCategory} creada exitosamente`
        });
    }
    catch (error) {
        res.json({
            msg: 'No se puede insertar la categoria',
            error
        });
    }
});
exports.newCategory = newCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneLevel = yield categorias_1.category.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield categorias_1.category.destroy({ where: { id: id } });
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
exports.deleteCategory = deleteCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nameCategory } = req.body;
    const oneLevel = yield categorias_1.category.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield categorias_1.category.update({ nameCategory }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe: ${nameCategory} `,
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
exports.updateCategory = updateCategory;
