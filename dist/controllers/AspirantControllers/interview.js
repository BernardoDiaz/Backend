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
exports.updateInterview = exports.deleteInterview = exports.newInterview = exports.getInterviewById = exports.getInterviews = void 0;
const consultation_1 = require("../../models/aspirantsModels/consultation");
//Metodo Listar
const getInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listInterviews = yield consultation_1.consultation.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
});
exports.getInterviews = getInterviews;
const getInterviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield consultation_1.consultation.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe una entrevista que concuerde con la busqueda`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getInterviewById = getInterviewById;
const newInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_aspirant, comments, state } = req.body;
    try {
        consultation_1.consultation.create({
            id_aspirant,
            comments,
            state
        });
        res.json({
            msg: `La entrevista del aspirante fue ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la entrevista",
            error
        });
    }
});
exports.newInterview = newInterview;
const deleteInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                msg: `La entrevista no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la entrevista`,
            error
        });
    }
});
exports.deleteInterview = deleteInterview;
const updateInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateInterview = updateInterview;
