import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyectlrd','root','root123456',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;  