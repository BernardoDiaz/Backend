"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.degree = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const seccion_1 = require("./seccion");
const level_1 = require("./level");
exports.degree = connection_1.default.define('degree', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    priceFee: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    id_seccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    year: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
});
seccion_1.seccion.hasMany(exports.degree, {
    foreignKey: 'id_seccion',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.degree.belongsTo(seccion_1.seccion, {
    foreignKey: 'id_seccion',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
level_1.level.hasMany(exports.degree, {
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.degree.belongsTo(level_1.level, {
    foreignKey: 'id_level',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
//  degree.sync({alter:true});
//  seccion.sync({alter:true});
//  level.sync({alter:true});
