"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingstudent = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const student_1 = require("./student");
const subject_1 = require("../subject");
const ratingtype_1 = require("./ratingtype");
exports.ratingstudent = connection_1.default.define('rating', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_subject: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_typerating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    rating: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 2
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
});
student_1.student.hasMany(exports.ratingstudent, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'set null'
});
exports.ratingstudent.belongsTo(student_1.student, {
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'set null'
});
subject_1.subject.hasMany(exports.ratingstudent, {
    foreignKey: 'id_subject',
    sourceKey: 'id',
    onDelete: 'set null'
});
exports.ratingstudent.belongsTo(subject_1.subject, {
    foreignKey: 'id_subject',
    targetKey: 'id',
    onDelete: 'set null'
});
ratingtype_1.ratingtype.hasMany(exports.ratingstudent, {
    foreignKey: 'id_typerating',
    sourceKey: 'id',
    onDelete: 'set null'
});
exports.ratingstudent.belongsTo(ratingtype_1.ratingtype, {
    foreignKey: 'id_typerating',
    targetKey: 'id',
    onDelete: 'set null'
});
