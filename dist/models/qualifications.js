"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qualifications = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const subject_1 = require("./subject");
const degree_1 = require("./degree");
const matricula_1 = require("./paymentsModels/matricula");
exports.qualifications = connection_1.default.define('qualification', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_subject: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_registration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    period: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.00
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear()
    }
});
subject_1.subject.hasMany(exports.qualifications, {
    foreignKey: 'id_subject',
    onDelete: 'RESTRICT'
});
exports.qualifications.belongsTo(subject_1.subject, {
    foreignKey: 'id_subject',
    onDelete: 'RESTRICT'
});
degree_1.degree.hasMany(exports.qualifications, {
    foreignKey: 'id_degree',
    onDelete: 'RESTRICT'
});
exports.qualifications.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    onDelete: 'RESTRICT'
});
matricula_1.registration.hasMany(exports.qualifications, {
    foreignKey: 'id_registration',
    onDelete: 'RESTRICT'
});
exports.qualifications.belongsTo(matricula_1.registration, {
    foreignKey: 'id_registration',
    onDelete: 'RESTRICT'
});
