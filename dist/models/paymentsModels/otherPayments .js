"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.other_payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.other_payment = connection_1.default.define('other_payment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name_fee: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date_payments: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    payment_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    }
});
