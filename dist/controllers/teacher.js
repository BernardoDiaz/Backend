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
exports.newTeacher = exports.getDegreeTeacher = exports.getTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const level_1 = require("../models/level");
const teacher_1 = require("../models/teacher");
const degree_1 = require("../models/degree");
const seccion_1 = require("../models/seccion");
const teacherDegree_1 = require("../models/intermediateModels/teacherDegree");
const sequelize_1 = require("sequelize");
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
    const idDegrees = yield teacherDegree_1.DegreeAssignment.findAll({ attributes: ['id_degree'] });
    // Extraemos solo los valores de id_degree
    const idDegreeValues = idDegrees.map((degreeAssignment) => {
        const degreeAssignmentValue = degreeAssignment.get({ plain: true });
        return degreeAssignmentValue.id_degree;
    });
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
                    }],
                where: {
                    id: {
                        [sequelize_1.Op.notIn]: idDegreeValues // Usamos notIn en lugar de ne
                    }
                }
            }]
    });
    //Devolvemos la respuesta via JSON
    res.json(list);
});
exports.getDegreeTeacher = getDegreeTeacher;
const newTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, id_level } = req.body;
    const hastPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield teacher_1.teacher.create({
            name: name,
            lastname: lastname,
            password: hastPassword,
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
