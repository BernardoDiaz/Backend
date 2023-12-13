import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { student } from "./studentsModels/student";

export const registration = sequelize.define('registration',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date_registration:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }
});

student.hasMany(registration, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'restrict'
});
registration.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'restrict'
});