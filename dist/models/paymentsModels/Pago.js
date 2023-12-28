"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const student_1 = require("../studentsModels/student");
exports.payment = connection_1.default.define('payment', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id_student: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
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
student_1.student.hasMany(exports.payment, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
exports.payment.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
