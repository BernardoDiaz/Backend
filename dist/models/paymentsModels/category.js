"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const product_1 = require("./product");
exports.category = connection_1.default.define('category', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_product: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
product_1.product.belongsTo(exports.category, {
    foreignKey: 'id_product',
    targetKey: 'id',
    onDelete: 'restrict'
});
exports.category.hasMany(product_1.product, {
    foreignKey: 'id_product',
    sourceKey: 'id',
    onDelete: 'restrict'
});
