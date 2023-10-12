import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const subject =  sequelize.define('subject',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
});