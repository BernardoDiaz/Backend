"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspirant = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const degree_1 = require("../degree");
const consultation_1 = require("./consultation");
const interview_1 = require("./interview");
exports.aspirant = connection_1.default.define('aspirant', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    manager: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    manager_phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    manager_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    aspirant_fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_degree: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    is_visible: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
degree_1.degree.hasMany(exports.aspirant, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
exports.aspirant.belongsTo(degree_1.degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'CASCADE'
});
exports.aspirant.hasMany(consultation_1.consultation, {
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
consultation_1.consultation.belongsTo(exports.aspirant, {
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'CASCADE'
});
exports.aspirant.hasMany(interview_1.interview, {
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
interview_1.interview.belongsTo(exports.aspirant, {
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'CASCADE'
});
//  aspirant.sync({alter:true});
// degree.sync({alter:true});
