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
exports.updateRatingType = exports.deleteRatingType = exports.newRatingType = exports.getRatingTypeById = exports.getRatingTypes = void 0;
const ratingtype_1 = require("../../models/studentsModels/ratingtype");
//Metodo Listar
const getRatingTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listRatingTypes = yield ratingtype_1.ratingtype.findAll();
    //Devolvemos la respuesta via JSON
    res.json(listRatingTypes);
});
exports.getRatingTypes = getRatingTypes;
const getRatingTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield ratingtype_1.ratingtype.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe un tipo de nota que concuerde con la busqueda`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }
});
exports.getRatingTypeById = getRatingTypeById;
const newRatingType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        ratingtype_1.ratingtype.create({
            name
        });
        res.json({
            msg: `El tipo de nota fue ingresado`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar el tipo de nota",
            error
        });
    }
});
exports.newRatingType = newRatingType;
const deleteRatingType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield ratingtype_1.ratingtype.findOne({ where: { id: id } });
    try {
        if (one) {
            yield ratingtype_1.ratingtype.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El tipo de nota no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el tipo de nota`,
            error
        });
    }
});
exports.deleteRatingType = deleteRatingType;
const updateRatingType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_student, id_subject, id_typerating, rating, date } = req.body;
    const one = yield ratingtype_1.ratingtype.findOne({ where: { id: id } });
    try {
        if (one) {
            yield ratingtype_1.ratingtype.update({ id_student, id_subject, id_typerating, rating, date }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un tipo de nota que actualizar`,
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
exports.updateRatingType = updateRatingType;
