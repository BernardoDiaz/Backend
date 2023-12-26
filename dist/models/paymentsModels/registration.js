"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const student_1 = require("../studentsModels/student");
exports.registration = connection_1.default.define('registration', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date_registration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
student_1.student.hasMany(exports.registration, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'restrict'
});
exports.registration.belongsTo(student_1.student, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'restrict'
});
