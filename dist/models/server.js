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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//RUTAS
const aspirant_1 = __importDefault(require("../routes/AspirantRoute/aspirant"));
const consultation_1 = __importDefault(require("../routes/AspirantRoute/consultation"));
const interview_1 = __importDefault(require("../routes/AspirantRoute/interview"));
const teacher_1 = __importDefault(require("../routes/teacher"));
const student_1 = __importDefault(require("../routes/StudentRoute/student"));
const studentdata_1 = __importDefault(require("../routes/StudentRoute/studentdata"));
const incidentsstudent_1 = __importDefault(require("../routes/StudentRoute/incidentsstudent"));
;
const user_1 = __importDefault(require("../routes/UserRoute/user"));
const degree_1 = __importDefault(require("../routes/degree"));
const level_1 = __importDefault(require("../routes/level"));
const seccion_1 = __importDefault(require("../routes/seccion"));
const subject_1 = __importDefault(require("../routes/subject"));
const categorias_1 = __importDefault(require("../routes/PaymentsRoute/categorias"));
const productos_1 = __importDefault(require("../routes/PaymentsRoute/productos"));
const pago_1 = __importDefault(require("../routes/PaymentsRoute/pago"));
const seatchs_1 = __importDefault(require("../routes/searchRoute/seatchs"));
const generatePDF_1 = __importDefault(require("../routes/ReportsRoute/generatePDF"));
const teacherDegree_1 = __importDefault(require("../routes/intermediateRoute/teacherDegree"));
const qualifications_1 = __importDefault(require("../routes/qualifications"));
//MODELOS DE BD
const aspirant_2 = require("./aspirantsModels/aspirant");
const user_2 = require("./usersModels/user");
const seccion_2 = require("./seccion");
const degree_2 = require("./degree");
const level_2 = require("./level");
const consultation_2 = require("./aspirantsModels/consultation");
const interview_2 = require("./aspirantsModels/interview");
const subject_2 = require("./subject");
const student_2 = require("./studentsModels/student");
const studentdata_2 = require("./studentsModels/studentdata");
const matricula_1 = require("./paymentsModels/matricula");
const categorias_2 = require("./paymentsModels/categorias");
const detallePago_1 = require("./paymentsModels/detallePago");
const planPagos_1 = require("./paymentsModels/planPagos");
const productos_2 = require("./paymentsModels/productos");
const pago_2 = require("./pago");
const generatePDF_2 = require("./ReportsModel/generatePDF");
const teacher_2 = require("./teacher");
const teacherDegree_2 = require("./intermediateModels/teacherDegree");
const qualifications_2 = require("./qualifications");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    ;
    listen() {
        this.app.listen(this.port, () => {
            console.log('port ' + this.port);
        });
    }
    ;
    routes() {
        //endpoint aspirantes
        this.app.use('/api/aspirant', aspirant_1.default);
        this.app.use('/api/consultation', consultation_1.default);
        this.app.use('/api/interview', interview_1.default);
        //endpoint estudiantes
        this.app.use('/api/student', student_1.default);
        this.app.use('/api/studentdata', studentdata_1.default);
        this.app.use('/api/incident', incidentsstudent_1.default);
        //endpoint usuarios
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/users/login', user_1.default);
        //endpoint grados
        this.app.use('/api/degree', degree_1.default);
        //endpoint niveles
        this.app.use('/api/level', level_1.default);
        //endpoint secciones
        this.app.use('/api/seccion', seccion_1.default);
        //endpoint asignaturas
        this.app.use('/api/subject', subject_1.default);
        this.app.use('/api/category', categorias_1.default);
        this.app.use('/api/product', productos_1.default);
        //endpoint categorias y productos
        this.app.use('/api/payment', pago_1.default);
        this.app.use('/api/search', seatchs_1.default);
        this.app.use('/api/gpdf', generatePDF_1.default);
        this.app.use('/api/teacher', teacher_1.default);
        this.app.use('/api/assig', teacherDegree_1.default);
        this.app.use('/api/qualification', qualifications_1.default);
    }
    ;
    midlewares() {
        //parceo body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    ;
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Modulo 01 BD
                yield level_2.level.sync();
                yield seccion_2.seccion.sync();
                yield degree_2.degree.sync();
                yield aspirant_2.aspirant.sync();
                yield consultation_2.consultation.sync();
                yield interview_2.interview.sync();
                //Fin Modulo 01 BD 
                yield teacher_2.teacher.sync();
                yield teacherDegree_2.DegreeAssignment.sync();
                yield subject_2.subject.sync();
                yield student_2.student.sync();
                yield matricula_1.registration.sync();
                yield studentdata_2.studentdata.sync();
                yield qualifications_2.qualifications.sync();
                yield pago_2.payment.sync();
                yield categorias_2.category.sync();
                yield productos_2.product.sync();
                yield detallePago_1.detailsPayment.sync();
                yield planPagos_1.planPayment.sync();
                yield generatePDF_2.generatePDF.sync();
                yield user_2.user.sync();
            }
            catch (error) {
                console.error('Connection not valid', error);
            }
            ;
        });
    }
    ;
}
;
exports.default = Server;
