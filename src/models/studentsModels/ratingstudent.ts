import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "./student";
import { subject } from "../subject";

export const ratingstudent = sequelize.define('rating',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    id_subject:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    rating1:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    rating2:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    rating3:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    rating_final:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 0
    },
    date_rating:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
});

student.hasMany(ratingstudent, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'set null'
});
ratingstudent.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'set null'
});

subject.hasMany(ratingstudent,{
    foreignKey: 'id_subject',
    sourceKey: 'id',
    onDelete: 'set null'
});
ratingstudent.belongsTo(subject,{
    foreignKey: 'id_subject',
    targetKey: 'id',
    onDelete: 'set null'
});