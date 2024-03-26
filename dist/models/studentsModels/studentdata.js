"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentdata = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const student_1 = require("./student");
exports.studentdata = connection_1.default.define('studentdata', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    //datos del alumno de ficha Liceo Rey David
    A_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    A_apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    A_grado: {
        type: sequelize_1.DataTypes.STRING
    },
    A_seccion: {
        type: sequelize_1.DataTypes.STRING
    },
    A_nie: {
        type: sequelize_1.DataTypes.INTEGER
    },
    A_fnacimiento: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    A_transporte: {
        type: sequelize_1.DataTypes.STRING
    },
    A_genero: {
        type: sequelize_1.DataTypes.STRING
    },
    A_estadocivil: {
        type: sequelize_1.DataTypes.STRING
    },
    A_nacionalidad: {
        type: sequelize_1.DataTypes.STRING
    },
    A_extranjero: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    enfermedades: {
        type: sequelize_1.DataTypes.STRING
    },
    discapacidad: {
        type: sequelize_1.DataTypes.STRING
    },
    detalldiscapacidad: {
        type: sequelize_1.DataTypes.STRING
    },
    diagnosticoclinico: {
        type: sequelize_1.DataTypes.STRING
    },
    medicamentopermanente: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    departamento: {
        type: sequelize_1.DataTypes.STRING
    },
    municipio: {
        type: sequelize_1.DataTypes.STRING
    },
    canton: {
        type: sequelize_1.DataTypes.STRING
    },
    telefonohogar: {
        type: sequelize_1.DataTypes.INTEGER
    },
    emailhogar: {
        type: sequelize_1.DataTypes.STRING
    },
    zona: {
        type: sequelize_1.DataTypes.STRING
    },
    tipovivienda: {
        type: sequelize_1.DataTypes.STRING
    },
    accesointernet: {
        type: sequelize_1.DataTypes.STRING
    },
    conexioninternet: {
        type: sequelize_1.DataTypes.STRING
    },
    computadora: {
        type: sequelize_1.DataTypes.STRING
    },
    numfamilia: {
        type: sequelize_1.DataTypes.INTEGER
    },
    trabaja: {
        type: sequelize_1.DataTypes.STRING
    },
    tipotrabajo: {
        type: sequelize_1.DataTypes.STRING
    },
    hijos: {
        type: sequelize_1.DataTypes.STRING
    },
    convivencia: {
        type: sequelize_1.DataTypes.STRING
    },
    economia: {
        type: sequelize_1.DataTypes.STRING
    },
    P_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    P_apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    P_dui: {
        type: sequelize_1.DataTypes.INTEGER
    },
    P_telefono: {
        type: sequelize_1.DataTypes.INTEGER
    },
    P_celular: {
        type: sequelize_1.DataTypes.STRING
    },
    P_correo: {
        type: sequelize_1.DataTypes.STRING
    },
    P_lugartrabajo: {
        type: sequelize_1.DataTypes.STRING
    },
    P_profesion: {
        type: sequelize_1.DataTypes.STRING
    },
    P_estadocivil: {
        type: sequelize_1.DataTypes.STRING
    },
    P_fnacimiento: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    P_municipionacimiento: {
        type: sequelize_1.DataTypes.STRING
    },
    P_escolaridad: {
        type: sequelize_1.DataTypes.STRING
    },
    P_encargado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    M_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    M_apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    M_dui: {
        type: sequelize_1.DataTypes.INTEGER
    },
    M_telefono: {
        type: sequelize_1.DataTypes.INTEGER
    },
    M_celular: {
        type: sequelize_1.DataTypes.INTEGER
    },
    M_correo: {
        type: sequelize_1.DataTypes.STRING
    },
    M_lugartrabajo: {
        type: sequelize_1.DataTypes.STRING
    },
    M_profesion: {
        type: sequelize_1.DataTypes.STRING
    },
    M_estadocivil: {
        type: sequelize_1.DataTypes.STRING
    },
    M_fnacimiento: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    M_municipionacimiento: {
        type: sequelize_1.DataTypes.STRING
    },
    M_escolaridad: {
        type: sequelize_1.DataTypes.STRING
    },
    M_encargado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    RP_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_dui: {
        type: sequelize_1.DataTypes.INTEGER
    },
    RP_telefono: {
        type: sequelize_1.DataTypes.INTEGER
    },
    RP_celular: {
        type: sequelize_1.DataTypes.INTEGER
    },
    RP_correo: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_lugartrabajo: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_profesion: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_estadocivil: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_fnacimiento: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    RP_municipionacimiento: {
        type: sequelize_1.DataTypes.STRING
    },
    RP_escolaridad: {
        type: sequelize_1.DataTypes.STRING
    },
    H1_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    H1_grado: {
        type: sequelize_1.DataTypes.STRING
    },
    H2_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    H2_grado: {
        type: sequelize_1.DataTypes.STRING
    },
    H3_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    H3_grado: {
        type: sequelize_1.DataTypes.STRING
    },
});
student_1.student.hasOne(exports.studentdata, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
