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
    id_degree: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_seccion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    year: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('YEAR(CURRENT_DATE())')
    }

});