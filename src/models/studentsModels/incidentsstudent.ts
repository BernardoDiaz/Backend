import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "./student";

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
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }

});

student.hasMany(incidentsstudent, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'set null'
});
incidentsstudent.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'set null'
});