"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const student_1 = require("./studentsModels/student");
exports.payments = connection_1.default.define('payments', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    date_payments: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    observation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
student_1.student.hasMany(exports.payments, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'restrict'
});
exports.payments.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'restrict'
});
