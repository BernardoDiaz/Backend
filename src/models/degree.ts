import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { seccion } from "./seccion";
import { level } from "./level";

export const degree = sequelize.define('degree', {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    id_seccion:{
        type:DataTypes.INTEGER,
        allowNull:true 
    },
    id_level:{
        type:DataTypes.INTEGER,
        allowNull:true
    }, 
    year:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
});
seccion.hasMany(degree, {
    foreignKey: 'id_seccion',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

degree.belongsTo(seccion, {
    foreignKey: 'id_seccion',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});

level.hasMany(degree, {
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

degree.belongsTo(level,{
    foreignKey: 'id_level',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});


//  degree.sync({alter:true});
//  seccion.sync({alter:true});
//  level.sync({alter:true});