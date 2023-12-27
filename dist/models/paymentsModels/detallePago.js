"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailsPayment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Pago_1 = require("./Pago");
const productos_1 = require("./productos");
exports.detailsPayment = connection_1.default.define('detailsPayment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_payment: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
Pago_1.payment.hasMany(exports.detailsPayment, {
    foreignKey: 'id_payment',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.detailsPayment.belongsTo(Pago_1.payment, {
    foreignKey: 'id_payment',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
productos_1.product.hasMany(exports.detailsPayment, {
    foreignKey: 'id_product',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.detailsPayment.belongsTo(productos_1.product, {
    foreignKey: 'id_product',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
