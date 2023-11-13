import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { degree } from "../degree";

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
    year: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

});

degree.hasMany(student,{
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'set null'
});

student.belongsTo(degree,{
    foreignKey:'id_degree',
    targetKey: 'id',
    onDelete: 'set null'
});