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
exports.updateRating = exports.deleteRating = exports.newRating = exports.getRatingById = exports.getRatings = void 0;
const ratingstudent_1 = require("../../models/studentsModels/ratingstudent");
//Metodo Listar
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listRatings = yield ratingstudent_1.ratingstudent.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listRatings);
});
exports.getRatings = getRatings;
const getRatingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield ratingstudent_1.ratingstudent.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro de notas que concuerde con la busqueda`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getRatingById = getRatingById;
const newRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student, id_subject, id_typerating, rating, date } = req.body;
    try {
        ratingstudent_1.ratingstudent.create({
            id_student,
            id_subject,
            id_typerating,
            rating,
            date
        });
        res.json({
            msg: `La calificacion del alumno fue ingresada`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la calificacion",
            error
        });
    }
});
exports.newRating = newRating;
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield ratingstudent_1.ratingstudent.findOne({ where: { id: id } });
    try {
        if (one) {
            yield ratingstudent_1.ratingstudent.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `La calificacion no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la calificacion`,
            error
        });
    }
});
exports.deleteRating = deleteRating;
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student, id_subject, id_typerating, rating, date } = req.body;
    const one = yield ratingstudent_1.ratingstudent.findOne({ where: { id: id } });
    try {
        if (one) {
            yield ratingstudent_1.ratingstudent.update({ id_student, id_subject, id_typerating, rating, date }, { where: { id: id } });
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
exports.updateRating = updateRating;
