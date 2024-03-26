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
exports.incidentes = exports.notas = exports.mora = exports.pendientePago = exports.pagado = exports.pagos = exports.matricula = void 0;
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const matricula_1 = require("../../models/paymentsModels/matricula");
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const incidentsstudent_1 = require("../../models/studentsModels/incidentsstudent");
const { Op } = require('sequelize');
const matricula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const list = yield matricula_1.registration.count({
        distinct: true,
        where: { id_student: idStudent }
    });
    res.json(list);
});
exports.matricula = matricula;
const pagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const year = new Date().getFullYear();
    const list = yield planPagos_1.planPayment.findAll({
        attributes: ['nameFee', 'state'],
        where: { id_student: idStudent, year: year }
    });
    res.json(list);
});
exports.pagos = pagos;
const pagado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const year = new Date().getFullYear();
    const list = yield planPagos_1.planPayment.findOne({
        attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPagado']],
        where: {
            id_student: idStudent,
            year: year,
            state: 1
        }
    });
    res.json(list);
});
exports.pagado = pagado;
const pendientePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const year = new Date().getFullYear();
    const list = yield planPagos_1.planPayment.findOne({
        attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPendiente']],
        where: {
            id_student: idStudent,
            year: year,
            state: 0
        }
    });
    res.json(list);
});
exports.pendientePago = pendientePago;
const mora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const year = new Date().getFullYear();
    const formattedDate = new Date().toISOString().split('T')[0];
    const list = yield planPagos_1.planPayment.findAll({
        attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'Mora']],
        where: {
            id_student: idStudent,
            year: year,
            dateExpiration: {
                [Op.lt]: formattedDate
            },
            datePayment: {
                [Op.or]: {
                    [Op.eq]: null
                }
            }
        }
    });
    res.json(list);
});
exports.mora = mora;
const notas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const query = `
    SELECT s.nameSubject AS Materia,AVG(q.rating) AS Promedio
    FROM qualifications q
    INNER JOIN subjects s ON q.id_subject = s.id
    INNER JOIN registrations r ON r.id = q.id_registration
    INNER JOIN students st ON st.id = r.id_student
    WHERE st.id = '${idStudent}'
    GROUP BY s.nameSubject;`;
    connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT })
        .then(results => {
        res.json(results);
    })
        .catch(error => {
        res.status(404).json('Error al ejecutar:' + error);
    });
});
exports.notas = notas;
const incidentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idStudent } = req.params;
    const year = new Date().getFullYear();
    //por incluir mañana.
    const list = yield incidentsstudent_1.incidentsstudent.findAll({});
    res.json(list);
});
exports.incidentes = incidentes;
