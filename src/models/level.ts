import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const level = sequelize.define('level',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    priceRegistration:{
        type:DataTypes.DOUBLE,
        allowNull:false 
    },
    // priceFee:{
    //     type:DataTypes.DOUBLE,
    //     allowNull:false
    // },
    periodsToEvaluate:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 3
    }
});