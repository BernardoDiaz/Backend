"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interview = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.interview = connection_1.default.define('interview', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aspirant: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sin Evaluar"
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendiente'
    }
});
