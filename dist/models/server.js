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
const aspirant_1 = __importDefault(require("../routes/aspirant"));
const user_1 = __importDefault(require("../routes/user"));
const degree_1 = __importDefault(require("../routes/degree"));
const level_1 = __importDefault(require("../routes/level"));
const seccion_1 = __importDefault(require("../routes/seccion"));
//MODELOS DE BD
const aspirant_2 = require("./aspirant");
const user_2 = require("./user");
const seccion_2 = require("./seccion");
const degree_2 = require("./degree");
const level_2 = require("./level");
const consultation_1 = require("./consultation");
const interview_1 = require("./interview");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
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
        //endpoint usuarios
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/users/login', user_1.default);
        //endpoint grados
        this.app.use('/api/degree', degree_1.default);
        //endpoint niveles
        this.app.use('/api/level', level_1.default);
        //endpoint secciones
        this.app.use('/api/seccion', seccion_1.default);
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
                yield consultation_1.consultation.sync();
                yield interview_1.interview.sync();
                //Fin Modulo 01 BD
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
