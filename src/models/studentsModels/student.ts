import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const student = sequelize.define('student', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    }

});