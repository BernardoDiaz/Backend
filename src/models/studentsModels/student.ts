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