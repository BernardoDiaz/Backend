import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "./student";
import { subject } from "../subject";
import { ratingtype } from "./ratingtype";

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
    id_typerating:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    rating:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue: 2
    },
    date:{
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

ratingtype.hasMany(ratingstudent,{
    foreignKey: 'id_typerating',
    sourceKey: 'id',
    onDelete: 'set null'
});
ratingstudent.belongsTo(ratingtype,{
    foreignKey: 'id_typerating',
    targetKey: 'id',
    onDelete: 'set null'
});