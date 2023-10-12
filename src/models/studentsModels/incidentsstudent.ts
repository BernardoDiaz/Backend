import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const incidentsstudent = sequelize.define('incidents',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    severity:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: sequelize.fn('NOW')
    }

});