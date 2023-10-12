"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.student = connection_1.default.define('student', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_seccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    year: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: connection_1.default.literal('YEAR(CURRENT_DATE())')
    }
});
