"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.other_generatePDF = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const otrosPagos_1 = require("../otrosPagos");
exports.other_generatePDF = connection_1.default.define('othergeneratePDF', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_other_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pdf: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    }
});
otrosPagos_1.otherPayment.hasOne(exports.other_generatePDF, {
    foreignKey: 'id',
    onDelete: 'RESTRICT'
});
exports.other_generatePDF.belongsTo(otrosPagos_1.otherPayment, {
    foreignKey: 'id',
    onDelete: 'RESTRICT'
});
