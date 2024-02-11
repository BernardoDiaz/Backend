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
exports.verifyQualification = exports.GenerateQualification = void 0;
const qualifications_1 = require("../models/qualifications");
const level_1 = require("../models/level");
const degree_1 = require("../models/degree");
const subject_1 = require("../models/subject");
const matricula_1 = require("../models/paymentsModels/matricula");
const GenerateQualification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdDegree } = req.params;
    const year = new Date().getFullYear();
    try {
        // 1. Obtener el nivel del grado (número de periodos) desde la tabla "nivel"
        const nivel = yield degree_1.degree.findOne({
            where: { id: IdDegree },
            attributes: [],
            include: [{ model: level_1.level, attributes: ['periodsToEvaluate'] }],
        });
        const numeroDePeriodos = nivel === null || nivel === void 0 ? void 0 : nivel.level.periodsToEvaluate;
        const alumnos = yield matricula_1.registration.findAll({
            where: { id_degree: IdDegree, year: year },
            attributes: ['id'],
        });
        // 2. Obtener las asignaturas vinculadas al grado
        const asignaturas = yield subject_1.subject.findAll({
            attributes: ['id'],
            where: { id_degree: IdDegree },
        });
        // 3. Iterar por los periodos, asignaturas y alumnos
        for (let periodo = 1; periodo <= numeroDePeriodos; periodo++) {
            for (const asignatura of asignaturas) {
                for (const alumno of alumnos) {
                    // 4. Inserción de notas (ejemplo)
                    const notaAlumno = {
                        id_degree: IdDegree,
                        id_subject: asignatura.id,
                        id_registration: alumno.id,
                        period: 'Periodo ' + periodo,
                        rating: 0.00,
                        year: year
                    };
                    yield qualifications_1.qualifications.create(notaAlumno);
                }
            }
        }
        return res.status(200).json({ msg: 'Notas generadas exitosamente' });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al generar las notas.',
            error,
        });
    }
});
exports.GenerateQualification = GenerateQualification;
const verifyQualification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdDegree } = req.params;
    try {
        // Verifica si hay registros previos para el grado
        const existingQualifications = yield qualifications_1.qualifications.findAll({
            where: { id_degree: IdDegree },
        });
        if (existingQualifications.length > 0) {
            return res.json({
                msg: 'El grado ya tiene registros de notas enlazados.',
                notasLista: true
            });
        }
        return res.json({
            msg: 'Notas generadas exitosamente.',
            notasLista: false
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al generar las notas.',
            error,
        });
    }
});
exports.verifyQualification = verifyQualification;
