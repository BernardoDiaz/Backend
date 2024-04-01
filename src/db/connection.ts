import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyectlrd','root','root123456',{
    host: 'localhost',
    dialect: 'mysql'
});

// const sequelize = new Sequelize('proyectlrd','root','ed|6vB{4Yn}F5gA4',{
//     host: '34.125.91.26', 
//     dialect: 'mysql'
// });

export default sequelize;  