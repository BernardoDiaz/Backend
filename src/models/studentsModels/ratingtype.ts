import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const ratingtype =  sequelize.define('ratingtype',{
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