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
exports.updateConsultation = exports.deleteConsultation = exports.newConsultation = exports.getConsultationById = exports.getConsultations = void 0;
const consultation_1 = require("../../models/aspirantsModels/consultation");
//Metodo Listar
const getConsultations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listConsultations = yield consultation_1.consultation.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listConsultations);
});
exports.getConsultations = getConsultations;
const getConsultationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield consultation_1.consultation.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe una cita medica que concuerde con la busqueda`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getConsultationById = getConsultationById;
const newConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_aspirant, comments, state } = req.body;
    try {
        consultation_1.consultation.create({
            id_aspirant,
            comments,
            state
        });
        res.json({
            msg: `La cita medica del aspirante fue ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la entrevista",
            error
        });
    }
});
exports.newConsultation = newConsultation;
const deleteConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield consultation_1.consultation.findOne({ where: { id: id } });
    try {
        if (one) {
            yield consultation_1.consultation.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La cita medica no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la cita medica`,
            error
        });
    }
});
exports.deleteConsultation = deleteConsultation;
const updateConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_aspirant, comments, state } = req.body;
    const one = yield consultation_1.consultation.findOne({ where: { id: id } });
    try {
        if (one) {
            yield consultation_1.consultation.update({ id_aspirant, comments, state }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro que actualizar`,
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
exports.updateConsultation = updateConsultation;
