import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "./student";

export const studentdata = sequelize.define('studentdata',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.STRING,
        allowNull:true
    },
    //datos del alumno de ficha Liceo Rey David
});

student.hasOne(studentdata, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'set null'
});