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
exports.updateQualification = exports.searchSubject = exports.periodToDegree = exports.verifyQualification = exports.GenerateQualification = void 0;
const qualifications_1 = require("../models/qualifications");
const level_1 = require("../models/level");
const degree_1 = require("../models/degree");
const subject_1 = require("../models/subject");
const matricula_1 = require("../models/paymentsModels/matricula");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
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
const periodToDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdDegree } = req.params;
    try {
        const list = yield qualifications_1.qualifications.findAll({
            attributes: ['period'],
            where: { id_degree: IdDegree },
            group: ['period'],
        });
        res.json(list);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al traer los periodos',
            error,
        });
    }
});
exports.periodToDegree = periodToDegree;
const searchSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdDegree, IdSubject, period } = req.params;
    try {
        const query = `
          SELECT  q.id AS Id, CONCAT(s.lastname, ' ', s.name) AS studentFullName,
                 ss.nameSubject AS subjectName,
                 q.rating
          FROM proyectlrd.qualifications AS q
          INNER JOIN registrations AS r ON q.id_registration = r.id
          INNER JOIN students AS s ON r.id_student = s.id
          INNER JOIN subjects AS ss ON q.id_subject = ss.id
          WHERE q.id_degree = ${IdDegree}
            AND q.period = '${period}'
            AND ss.id = ${IdSubject}
          ORDER BY s.lastname ASC
        `;
        const results = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        // Aquí puedes hacer lo que necesites con los resultados obtenidos
        res.json(results);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al traer los registros',
            error,
        });
    }
});
exports.searchSubject = searchSubject;
const updateQualification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Qualifications } = req.body;
        // Itera sobre cada calificación y actualiza el registro correspondiente
        for (const registros of Qualifications) {
            const { id, rating } = registros;
            // Actualiza la calificación en la base de datos
            yield qualifications_1.qualifications.update({ rating }, { where: { id: id } });
        }
        res.status(200).json({ message: 'Calificaciones ingresadas' });
    }
    catch (error) {
        console.error('Error al actualizar las calificaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.updateQualification = updateQualification;
