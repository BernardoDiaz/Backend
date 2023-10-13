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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    //datos del alumno de ficha Liceo Rey David
});
student_1.student.hasOne(exports.studentdata, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'set null'
});
