import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "../studentsModels/student";

export const payment = sequelize.define('payment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalAmount:{
        type:DataTypes.DOUBLE,
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
    }
});

payment.hasMany(student,{
    foreignKey:'id_student',
    sourceKey:'id',
    onDelete:'RESTRICT'
});

student.belongsTo(payment,{
    foreignKey:'id_student',
    targetKey: 'id',
    onDelete:'RESTRICT'
});