import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const student = sequelize.define('student', {

    id: { 
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true  
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'Activo'
    }

});