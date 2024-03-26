"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('proyectlrd', 'root', 'root123456', {
    host: '10.128.0.3',
    dialect: 'mysql'
});
exports.default = sequelize;
