import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const studentdata = sequelize.define('rating',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    //datos del alumno de ficha Liceo Rey David
});