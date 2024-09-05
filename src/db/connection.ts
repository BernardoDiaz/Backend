import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyectlrd','root','root123456',{
    host: 'localhost',
    dialect: 'mysql'
});

// const sequelize = new Sequelize('proyectlrd','vmtest','ed|6vB{4Yn}F5gA4',{
//     host: 'localhost', 
//     dialect: 'mysql'
// });

export default sequelize;    