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
exports.newStudents_Asp = exports.viewCaseAspirant = exports.updateAspirant = exports.deleteAspirant = exports.newAspirant = exports.getAspirantById = exports.getAspirants = void 0;
const aspirant_1 = require("../../models/aspirantsModels/aspirant");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../../models/degree");
const shortid_1 = __importDefault(require("shortid"));
const interview_1 = require("../../models/aspirantsModels/interview");
const consultation_1 = require("../../models/aspirantsModels/consultation");
const student_1 = require("../../models/studentsModels/student");
const matricula_1 = require("../../models/paymentsModels/matricula");
const level_1 = require("../../models/level");
const planPagos_1 = require("../../models/paymentsModels/planPagos");
//Metodo Listar
const getAspirants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listAspirants = yield aspirant_1.aspirant.findAll({ include: {
            model: degree_1.degree, attributes: ['name'],
            where: { id: connection_1.default.col('degree.id') }
        } });
    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
});
exports.getAspirants = getAspirants;
const getAspirantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield aspirant_1.aspirant.findByPk(id);
    //validacion de existencia
    try {
        if (oneaspirant) {
            res.json(oneaspirant);
        }
        else {
            return res.status(404).json({
                msg: `No existe un aspirante`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el aspirante`
        });
    }
});
exports.getAspirantById = getAspirantById;
const newAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    const id = shortid_1.default.generate();
    try {
        aspirant_1.aspirant.create({
            id: id,
            manager: manager,
            manager_phone: manager_phone,
            manager_email: manager_email,
            adress: adress,
            aspirant_fullname: aspirant_fullname,
            id_degree: id_degree
        });
        interview_1.interview.create({
            id_aspirant: id
        });
        consultation_1.consultation.create({
            id_aspirant: id
        });
        res.json({
            msg: `El aspirante ${aspirant_fullname} fue inscrito en el proceso de seleccion`
        });
    }
    catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un aspirante",
            error
        });
    }
});
exports.newAspirant = newAspirant;
const deleteAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const oneaspirant = yield aspirant_1.aspirant.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield aspirant_1.aspirant.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        }
        else {
            res.status(404).json({
                msg: `El aspirante ya no existe`
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el aspirante`,
            error
        });
    }
});
exports.deleteAspirant = deleteAspirant;
const updateAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    const oneaspirant = yield aspirant_1.aspirant.findOne({ where: { id: id } });
    try {
        if (oneaspirant) {
            yield aspirant_1.aspirant.update({ manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        }
        else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el aspirante`,
            error
        });
    }
});
exports.updateAspirant = updateAspirant;
const viewCaseAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Generamos la lista
    const listAspirants = yield aspirant_1.aspirant.findAll({
        attributes: ['id', 'aspirant_fullname', 'is_visible'],
        include: [
            {
                model: consultation_1.consultation,
                attributes: ['state'],
                required: true // Esto asegura que se haga un INNER JOIN
            },
            {
                model: interview_1.interview,
                attributes: ['state'],
                required: true // Esto asegura que se haga un INNER JOIN
            },
            {
                model: degree_1.degree,
                attributes: ['id', 'name'], include: [{ model: level_1.level, attributes: ['id', 'priceRegistration', 'priceFee'] }],
                where: { id: connection_1.default.col('degree.id') }
            }
        ]
    });
    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
});
exports.viewCaseAspirant = viewCaseAspirant;
const newStudents_Asp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = req.body.students; // Suponiendo que envías un arreglo de estudiantes
    try {
        for (const studentData of students) {
            const { id, name, lastname, id_degree, id_level, priceFee, priceRegistration } = studentData;
            const idGenerete = shortid_1.default.generate();
            const year = new Date().getFullYear();
            // Crear el registro de estudiante
            yield student_1.student.create({
                id: idGenerete,
                name: name,
                lastname: lastname,
                year: year,
                state: true
            });
            // Ocultar el registro de aspirante 
            yield aspirant_1.aspirant.update({ is_visible: false }, // Campo para ocultar
            { where: { id: id } } // Condiciones para identificar al aspirante
            );
            // Generación de matrícula
            yield matricula_1.registration.create({
                id_student: idGenerete,
                id_degree,
                id_level,
                year
            });
            // Generación de plan de pago
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
            planPayments.unshift(studentInfo);
            yield planPagos_1.planPayment.bulkCreate(planPayments);
        }
        res.json({
            msg: "Todos los alumnos fueron ingresados correctamente"
        });
    }
    catch (error) {
        console.error('Error al registrar los alumnos:', error);
        res.status(500).json({
            msg: "Ocurrió un error al registrar los alumnos",
            error: error
        });
    }
});
exports.newStudents_Asp = newStudents_Asp;
