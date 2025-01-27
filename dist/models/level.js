"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.level = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.level = connection_1.default.define('level', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    priceRegistration: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    // priceFee:{
    //     type:DataTypes.DOUBLE,
    //     allowNull:false
    // },
    periodsToEvaluate: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
    }
});
