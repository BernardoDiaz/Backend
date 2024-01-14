import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { payment } from "../paymentsModels/pago";

export const generatePDF = sequelize.define('generatePDF', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pdf:{
        type:DataTypes.BLOB,
        allowNull:false
    }
});

payment.hasOne(generatePDF,{
    foreignKey:'id_payment',
    onDelete:'RESTRICT'
});

generatePDF.belongsTo(payment,{
    foreignKey:'id_payment',
    onDelete:'RESTRICT'
});