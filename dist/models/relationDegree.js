"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationDegree = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const degree_1 = require("./degree");
exports.relationDegree = connection_1.default.define('assignedDegree', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
});
degree_1.degree.hasMany(exports.relationDegree, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'set null'
});
exports.relationDegree.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'set null'
});
