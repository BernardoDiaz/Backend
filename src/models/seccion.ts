import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const seccion = sequelize.define('seccion', {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    }                           
});