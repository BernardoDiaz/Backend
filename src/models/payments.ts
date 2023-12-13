import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { student } from "./studentsModels/student";


export const payments = sequelize.define('payments',{

    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
     id_student:{
        type: DataTypes.INTEGER,
        allowNull:false

     },
     date_payments:{
        type:DataTypes.DATEONLY,
        allowNull:false
     },
     price:{
        type:DataTypes.DOUBLE,
        allowNull:false
     },
     observation:{
        type:DataTypes.STRING,
        allowNull:false
     }
});

student.hasMany(payments, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'restrict'
});
payments.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'restrict'
});