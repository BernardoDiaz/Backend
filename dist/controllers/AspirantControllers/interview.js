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
exports.updateInterview = exports.deleteInterview = exports.newInterview = exports.getInterviewById = exports.getAspirantsFilter = exports.getInterviewsPendient = exports.getInterviews = void 0;
const aspirant_1 = require("../../models/aspirantsModels/aspirant");
const connection_1 = __importDefault(require("../../db/connection"));
const interview_1 = require("../../models/aspirantsModels/interview");
const sequelize_1 = require("sequelize");
//Metodo Listar
const getInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listInterviews = yield interview_1.interview.findAll({
        include: {
            model: aspirant_1.aspirant, attributes: ['aspirant_fullname'],
            where: { id: connection_1.default.col('interview.id') }
        }
    });
    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
});
exports.getInterviews = getInterviews;
const getInterviewsPendient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listInterviews = yield interview_1.interview.findAll({
        include: {
            model: aspirant_1.aspirant,
            attributes: ['aspirant_fullname'],
            where: { id: connection_1.default.col('interview.id') }
        },
        where: { state: 'Pendiente' }
    });
    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
});
exports.getInterviewsPendient = getInterviewsPendient;
const getAspirantsFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  const listAspirantsfl = await aspirant.findAll(
    //      {attributes:['id','aspirant_fullname']});
    const listAspirantsfl = yield interview_1.interview.findAll({
        attributes: ['id', [sequelize_1.Sequelize.col('aspirant.id'), 'id_aspirant'], [sequelize_1.Sequelize.col('aspirant.aspirant_fullname'), 'aspirant_fullname']],
        include: [{
                model: aspirant_1.aspirant,
                attributes: []
            }],
        where: {
            state: 'Pendiente',
        },
    });
    //Devolvemos la respuesta via JSON
    res.json(listAspirantsfl);
});
exports.getAspirantsFilter = getAspirantsFilter;
const getInterviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield interview_1.interview.findByPk(id);
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
        interview_1.interview.create({
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
    const one = yield interview_1.interview.findOne({ where: { id: id } });
    try {
        if (one) {
            yield interview_1.interview.destroy({ where: { id: id } });
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
    const one = yield interview_1.interview.findOne({ where: { id: id } });
    try {
        if (one) {
            yield interview_1.interview.update({ id_aspirant, comments, state }, { where: { id: id } });
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
