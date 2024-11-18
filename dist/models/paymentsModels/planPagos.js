"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planPayment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const level_1 = require("../level");
const student_1 = require("../studentsModels/student");
const pago_1 = require("../pago");
exports.planPayment = connection_1.default.define('planPayment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_payment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    id_student: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }, id_level: {
        type: sequelize_1.DataTypes.INTEGER,
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
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    dateExpiration: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
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
pago_1.payment.hasMany(exports.planPayment, {
    foreignKey: 'id_payment',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.planPayment.belongsTo(pago_1.payment, {
    foreignKey: 'id_payment',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
student_1.student.hasMany(exports.planPayment, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.planPayment.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
level_1.level.hasMany(exports.planPayment, {
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.planPayment.belongsTo(level_1.level, {
    foreignKey: 'id_level',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
