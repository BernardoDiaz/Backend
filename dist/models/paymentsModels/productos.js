"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const categorias_1 = require("./categorias");
exports.product = connection_1.default.define('product', {
    //PRODUCTOS GENERICOS 
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    id_category: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
});
exports.product.hasMany(categorias_1.category, {
    foreignKey: 'id_category',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
categorias_1.category.belongsTo(exports.product, {
    foreignKey: 'id_category',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
