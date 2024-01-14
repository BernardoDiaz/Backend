"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const pago_1 = require("../paymentsModels/pago");
exports.generatePDF = connection_1.default.define('generatePDF', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pdf: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    }
});
pago_1.payment.hasOne(exports.generatePDF, {
    foreignKey: 'id_payment',
    onDelete: 'RESTRICT'
});
exports.generatePDF.belongsTo(pago_1.payment, {
    foreignKey: 'id_payment',
    onDelete: 'RESTRICT'
});
