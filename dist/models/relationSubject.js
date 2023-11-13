"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationSubject = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const subject_1 = require("./subject");
exports.relationSubject = connection_1.default.define('assignedDegree', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_subject: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
});
subject_1.subject.hasMany(exports.relationSubject, {
    foreignKey: 'id_subject',
    sourceKey: 'id',
    onDelete: 'set null'
});
exports.relationSubject.belongsTo(subject_1.subject, {
    foreignKey: 'id_subject',
    targetKey: 'id',
    onDelete: 'set null'
});
