import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { level } from "../level";
import { student } from "../studentsModels/student";

export const planPayment = sequelize.define('planPayment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:false
    },id_level:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    nameFee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    datePayment:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue: DataTypes.NOW
    },
    dateExpiration:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    state:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
});

student.hasMany(planPayment,{
    foreignKey:'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
planPayment.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});

planPayment.hasMany(level, {
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'set null'
});

level.belongsTo(planPayment,{
    foreignKey: 'id_level',
    targetKey: 'id',
    onDelete: 'set null'
});
