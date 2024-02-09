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
const GenerateQualification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdDegree } = req.body;
    try {
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
