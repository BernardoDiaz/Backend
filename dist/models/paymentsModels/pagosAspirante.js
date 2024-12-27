"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentAspirant = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const aspirant_1 = require("../aspirantsModels/aspirant");
exports.paymentAspirant = connection_1.default.define('paymentAspirant', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    id_aspirant: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nameFee: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    datePayment: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    discount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
aspirant_1.aspirant.hasMany(exports.paymentAspirant, {
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.paymentAspirant.belongsTo(exports.paymentAspirant, {
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
