"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacher = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const level_1 = require("./level");
exports.teacher = connection_1.default.define('teacher', {
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
    password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    id_level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    }
});
level_1.level.hasMany(exports.teacher, {
    foreignKey: 'id_level',
    onDelete: 'RESTRICT'
});
exports.teacher.belongsTo(level_1.level, {
    foreignKey: 'id_level',
    onDelete: 'RESTRICT'
});
