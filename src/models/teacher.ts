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
    password:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    id_level:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    state:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:1
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