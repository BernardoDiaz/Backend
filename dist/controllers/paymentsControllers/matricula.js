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
exports.get = void 0;
const matricula_1 = require("../../models/paymentsModels/matricula");
const student_1 = require("../../models/studentsModels/student");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../../models/degree");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield matricula_1.registration.findAll({
            include: {
                model: student_1.student,
                attributes: ['name', 'lastname'],
                where: { id: connection_1.default.col('student.id') },
                include: [{
                        model: degree_1.degree,
                        attributes: ['name'],
                        where: { id: connection_1.default.col('registration.id_degree') }
                    }]
            }
        });
        res.json(list);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.get = get;
