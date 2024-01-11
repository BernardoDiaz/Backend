import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "../studentsModels/student";

export const payment = sequelize.define('payment', {

    count: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false 
    },
    id: {
        type: DataTypes.STRING,
        unique:true
    },
    id_student: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    datePayment: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    }
});

student.hasMany(payment,{
    foreignKey:'id_student',
    sourceKey:'id',
    onDelete:'RESTRICT'
});

payment.belongsTo(student,{
    foreignKey:'id_student',
    targetKey: 'id',
    onDelete:'RESTRICT'
});