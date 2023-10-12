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
exports.updateAspirant = exports.deleteAspirant = exports.newAspirant = exports.getAspirantById = exports.getAspirants = void 0;
const aspirant_1 = require("../models/aspirantsModels/aspirant");
//Metodo Listar
const getAspirants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listAspirants = yield aspirant_1.aspirant.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
});
exports.getAspirants = getAspirants;
const getAspirantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield aspirant_1.aspirant.findByPk(id);
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
exports.getAspirantById = getAspirantById;
const newAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    try {
        aspirant_1.aspirant.create({
            manager: manager,
            manager_phone: manager_phone,
            manager_email: manager_email,
            adress: adress,
            aspirant_fullname: aspirant_fullname,
            id_degree: id_degree
        });
        res.json({
            msg: `El aspirante ${aspirant_fullname} fue inscrito en el proceso de seleccion`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un aspirante",
            error
        });
    }
});
exports.newAspirant = newAspirant;
const deleteAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield aspirant_1.aspirant.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield aspirant_1.aspirant.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El aspirante ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el aspirante`,
            error
        });
    }
});
exports.deleteAspirant = deleteAspirant;
const updateAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    const oneaspirant = yield aspirant_1.aspirant.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield aspirant_1.aspirant.update({ manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree }, { where: { id: id } });
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
exports.updateAspirant = updateAspirant;
