"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subject = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const degree_1 = require("./degree");
exports.subject = connection_1.default.define('subject', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameSubject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    cantPeriods: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
    }
});
degree_1.degree.hasMany(exports.subject, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.subject.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
