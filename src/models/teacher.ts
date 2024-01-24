import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { level } from "./level";

export const teacher = sequelize.define('teacher',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING, 
        allowNull:false
    },
    id_level:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

level.hasMany(teacher, {
    foreignKey: 'id_level',
    onDelete: 'RESTRICT'
});

teacher.belongsTo(level, {
    foreignKey: 'id_level',
    onDelete: 'RESTRICT'
});