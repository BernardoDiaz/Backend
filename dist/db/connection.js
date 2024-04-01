"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('proyectlrd', 'root', 'root123456', {
    host: 'localhost',
    dialect: 'mysql'
});
// const sequelize = new Sequelize('proyectlrd','root','ed|6vB{4Yn}F5gA4',{
//     host: '34.125.91.26', 
//     dialect: 'mysql'
// });
exports.default = sequelize;
