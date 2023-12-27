import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const category = sequelize.define('category', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameCategory: {
        type: DataTypes.STRING,
        allowNull: false
    }
});