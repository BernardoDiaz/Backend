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
exports.updateAspirantFees = exports.deleteAspirantFees = exports.newAspirantFee = exports.getAspirantFeesById = exports.getAspirantsFees = void 0;
const arancelesIngreso_1 = require("../../../models/arancelesIngreso");
//Metodo Listar
const getAspirantsFees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listAspirants = yield arancelesIngreso_1.admissionFees.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
});
exports.getAspirantsFees = getAspirantsFees;
const getAspirantFeesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield arancelesIngreso_1.admissionFees.findByPk(id);
    //validacion de existencia
    try {
        if (oneaspirant) {
            res.json(oneaspirant);
        }
        else {
            return res.status(404).json({
                msg: `No existe un aspirante`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el aspirante`
        });
    }
});
exports.getAspirantFeesById = getAspirantFeesById;
const newAspirantFee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, year } = req.body;
    const yearr = new Date().getFullYear();
    try {
        arancelesIngreso_1.admissionFees.create({
            name,
            price,
            year: yearr
        });
        res.json({
            msg: `Aranceles asignados al año ${year}`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error al registrar la informacion",
            error
        });
    }
});
exports.newAspirantFee = newAspirantFee;
const deleteAspirantFees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield arancelesIngreso_1.admissionFees.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield arancelesIngreso_1.admissionFees.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El registro ya no existe`
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
exports.deleteAspirantFees = deleteAspirantFees;
const updateAspirantFees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, year } = req.body;
    const oneaspirant = yield arancelesIngreso_1.admissionFees.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield arancelesIngreso_1.admissionFees.update({ name, price, year }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
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
            msg: `Ocurrio un error al editar el aspirante`,
            error
        });
    }
});
exports.updateAspirantFees = updateAspirantFees;
