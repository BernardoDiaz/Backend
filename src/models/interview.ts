import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const interview = sequelize.define('interview',{

    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_aspirant:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    comments:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'Pendiente'
    }
});