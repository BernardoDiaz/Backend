import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { subject } from "./subject";

export const relationSubject =  sequelize.define('assignedDegree',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_subject:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});

subject.hasMany(relationSubject,{
    foreignKey: 'id_subject',
    sourceKey: 'id',
    onDelete: 'set null'
});

relationSubject.belongsTo(subject,{
    foreignKey:'id_subject',
    targetKey: 'id',
    onDelete: 'set null'
    
});