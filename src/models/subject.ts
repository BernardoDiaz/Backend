import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { degree } from "./degree";

export const subject =  sequelize.define('subject',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_degree:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
});

degree.hasMany(subject,{
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'set null'
});

subject.belongsTo(degree,{
    foreignKey:'id_degree',
    targetKey: 'id',
    onDelete: 'set null'
    
});