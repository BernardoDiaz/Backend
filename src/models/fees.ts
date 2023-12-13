import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const fee = sequelize.define('typesfee',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }
});