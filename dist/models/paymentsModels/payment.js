"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const student_1 = require("../studentsModels/student");
const product_1 = require("./product");
exports.payment = connection_1.default.define('payment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    payment_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    date_payments: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
student_1.student.hasMany(exports.payment, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'restrict'
});
exports.payment.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'restrict'
});
product_1.product.hasMany(exports.payment, {
    foreignKey: 'id_product',
    sourceKey: 'id',
    onDelete: 'restrict'
});
exports.payment.belongsTo(product_1.product, {
    foreignKey: 'id_product',
    targetKey: 'id',
    onDelete: 'restrict'
});