"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../degree");
const student_1 = require("../studentsModels/student");
const level_1 = require("../level");
exports.registration = connection_1.default.define('registration', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
student_1.student.hasMany(exports.registration, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.registration.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
degree_1.degree.hasMany(exports.registration, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.registration.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
level_1.level.hasMany(exports.registration, {
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.registration.belongsTo(level_1.level, {
    foreignKey: 'id_level',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
