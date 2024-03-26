import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyectlrd','root','root123456',{
    host: '10.128.0.3',
    dialect: 'mysql'
});

export default sequelize;  