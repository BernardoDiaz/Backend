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
exports.newTeacher = exports.getDegreeTeacher = exports.getTeacher = void 0;
const level_1 = require("../models/level");
const teacher_1 = require("../models/teacher");
const degree_1 = require("../models/degree");
const seccion_1 = require("../models/seccion");
//Metodo Listar
const getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const list = yield teacher_1.teacher.findAll({
        attributes: ['id', 'name', 'lastname', 'id_level'],
    });
    //Devolvemos la respuesta via JSON
    res.json(list);
});
exports.getTeacher = getTeacher;
const getDegreeTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_levelSearch } = req.params;
    //Generamos la lista
    const list = yield level_1.level.findAll({
        attributes: ['id'],
        where: { id: id_levelSearch },
        include: [{
                model: degree_1.degree,
                attributes: ['id', 'name'],
                include: [{
                        model: seccion_1.seccion,
                        attributes: ['name']
                    }]
            }]
    });
    //Devolvemos la respuesta via JSON
    res.json(list);
});
exports.getDegreeTeacher = getDegreeTeacher;
const newTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, id_level } = req.body;
    try {
        yield teacher_1.teacher.create({
            name: name,
            lastname: lastname,
            id_level: id_level
        });
        res.json({
            msg: `El Maestro ${name} fue creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear",
            error
        });
    }
});
exports.newTeacher = newTeacher;
