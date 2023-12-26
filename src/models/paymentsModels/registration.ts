import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "../studentsModels/student";

export const registration = sequelize.define('registration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_registration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    year: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

student.hasMany(registration, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'restrict'
});
registration.belongsTo(student, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'restrict'
});