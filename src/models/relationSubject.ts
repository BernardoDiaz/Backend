import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { degree } from "./degree";

export const relationDegree =  sequelize.define('assignedDegree',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_degree:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});

degree.hasMany(relationDegree,{
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'set null'
});

relationDegree.belongsTo(degree,{
    foreignKey:'id_degree',
    targetKey: 'id',
    onDelete: 'set null'
    
});