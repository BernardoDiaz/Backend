import {Sequelize} from "sequelize";


// const sequelize = new Sequelize('proyectlrd','root','root123456',{
//     host: 'localhost',
//     dialect: 'mysql'
// });

const sequelize = new Sequelize('proyectlrd','vmtest','Takuache09%',{
    host: '10.128.0.3',
    port:3306,
    dialect: 'mysql'
});

export default sequelize;  