"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize = new Sequelize('proyectlrd','root','root123456',{
//     host: 'localhost',
//     dialect: 'mysql'
// });
const sequelize = new sequelize_1.Sequelize('proyectlrd', 'vmtest', 'ed|6vB{4Yn}F5gA4', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
