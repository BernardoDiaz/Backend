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
exports.updateProduct = exports.deleteProduct = exports.newProduct = exports.getProduct = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const productos_1 = require("../../models/paymentsModels/productos");
const categorias_1 = require("../../models/paymentsModels/categorias");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield productos_1.product.findAll({ attributes: ['id', 'nameProduct', 'price'], include: {
                model: categorias_1.category,
                attributes: ['id', 'nameCategory'],
                where: { id: connection_1.default.col('category.id') }
            } });
        res.json(list);
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
});
exports.getProduct = getProduct;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameProduct, price, id_category } = req.body;
    try {
        yield productos_1.product.create({
            nameProduct,
            price,
            id_category
        });
        res.json({
            msg: ` ${nameProduct} creado exitosamente`
        });
    }
    catch (error) {
        res.json({
            msg: 'No se puede insertar el producto',
            error
        });
    }
});
exports.newProduct = newProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneLevel = yield productos_1.product.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield productos_1.product.destroy({ where: { id: id } });
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
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nameProduct, price, id_category } = req.body;
    const oneLevel = yield categorias_1.category.findOne({ where: { id: id } });
    try {
        if (oneLevel) {
            yield categorias_1.category.update({ nameProduct, price, id_category }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe: ${nameProduct} `,
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
exports.updateProduct = updateProduct;
