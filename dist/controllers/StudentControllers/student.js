"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateStudent = exports.deleteStudent = exports.newRegistration = exports.newStudent = exports.getStudentById = exports.getStudents = void 0;
const student_1 = require("../../models/studentsModels/student");
const matricula_1 = require("../../models/paymentsModels/matricula");
const shortid = __importStar(require("shortid"));
const planPagos_1 = require("../../models/paymentsModels/planPagos");
//Metodo Listar
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generamos la lista de estudiantes
        const listaEstudiantes = yield student_1.student.findAll({
            attributes: ['id', 'name', 'lastname', 'state']
        });
        // Devolvemos la respuesta en formato JSON
        res.json(listaEstudiantes);
    }
    catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield student_1.student.findByPk(id);
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        }
        else {
            return res.status(404).json({
                msg: `No existe un alumno`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el alumno`
        });
    }
});
exports.getStudentById = getStudentById;
const newStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, year, id_degree, id_level } = req.body;
    try {
        const idGenerete = shortid.generate();
        yield student_1.student.create({
            id: idGenerete,
            name: name,
            lastname: lastname,
            year: year,
            state: true
        });
        //generacion de matricula
        yield matricula_1.registration.create({
            id_student: idGenerete,
            id_degree,
            id_level,
            year
        });
        //generacion de plan de pago
        const { priceFee } = req.body;
        const planPayments = [];
        for (let i = 1; i <= 11; i++) {
            const date = new Date(year, i - 1, 18);
            planPayments.push({
                id_student: idGenerete,
                id_payment: null,
                id_level,
                nameFee: 'Cuota ' + i + ' - ' + year,
                year,
                datePayment: null,
                dateExpiration: date,
                price: priceFee,
                state: false,
            });
        }
        const { priceRegistration } = req.body;
        const studentInfo = {
            id_student: idGenerete,
            id_payment: null,
            id_level,
            nameFee: 'Matrícula - ' + year,
            year,
            datePayment: null,
            dateExpiration: new Date(year, 0, 18),
            price: priceRegistration,
            state: false,
        };
        yield planPayments.unshift(studentInfo);
        yield planPagos_1.planPayment.bulkCreate(planPayments);
        res.json({
            msg: `El alumno ${name + ' ' + lastname} fue ingresado`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un alumno",
            error
        });
    }
});
exports.newStudent = newStudent;
const newRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_student, id_degree, id_level, year } = req.body;
    try {
        //generacion de matricula
        yield matricula_1.registration.create({
            id_student,
            id_degree,
            id_level,
            year
        });
        //generacion de plan de pago
        const { priceFee } = req.body;
        const planPayments = [];
        for (let i = 1; i <= 11; i++) {
            const date = new Date(year, i - 1, 18);
            planPayments.push({
                id_student: id_student,
                id_payment: null,
                id_level,
                nameFee: 'Cuota ' + i + ' - ' + year,
                year,
                datePayment: null,
                dateExpiration: date,
                price: priceFee,
                state: false,
            });
        }
        const { priceRegistration } = req.body;
        const studentInfo = {
            id_student: id_student,
            id_payment: null,
            id_level,
            nameFee: 'Matrícula - ' + year,
            year,
            datePayment: null,
            dateExpiration: new Date(year, 0, 18),
            price: priceRegistration,
            state: false,
        };
        yield planPayments.unshift(studentInfo);
        yield planPagos_1.planPayment.bulkCreate(planPayments);
        res.json({
            msg: `El alumno fue matriculado con exito`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un alumno",
            error
        });
    }
});
exports.newRegistration = newRegistration;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield student_1.student.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El alumno ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
});
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, lastname, id_degree } = req.body;
    const one = yield student_1.student.findOne({ where: { id: id } });
    try {
        if (one) {
            yield student_1.student.update({ name, lastname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro del alumno: ${name + '' + lastname} `,
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
exports.updateStudent = updateStudent;
