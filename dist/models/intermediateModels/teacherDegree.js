"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeAssignment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../degree");
const teacher_1 = require("../teacher");
exports.DegreeAssignment = connection_1.default.define('DegreeAssignment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_teacher: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
degree_1.degree.hasOne(exports.DegreeAssignment, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.DegreeAssignment.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
teacher_1.teacher.hasOne(exports.DegreeAssignment, {
    foreignKey: 'id_teacher',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.DegreeAssignment.belongsTo(teacher_1.teacher, {
    foreignKey: 'id_teacher',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
