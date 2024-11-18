"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherPayment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.otherPayment = connection_1.default.define('otherPayment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_other_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nameProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    unit_price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    discount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    datePayment: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
});
