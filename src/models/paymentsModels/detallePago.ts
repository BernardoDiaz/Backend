import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { product } from "./productos";
import { payment } from "./pago";
export const detailsPayment = sequelize.define('detailsPayment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_payment:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_product:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

payment.hasMany(detailsPayment,{
    foreignKey:'id_payment',
    sourceKey:'id',
    onDelete:'RESTRICT'
});
detailsPayment.belongsTo(payment,{
    foreignKey:'id_payment',
    targetKey:'id',
    onDelete:'RESTRICT'
});

product.hasMany(detailsPayment,{
    foreignKey:'id_product',
    sourceKey:'id',
    onDelete:'RESTRICT'
});

detailsPayment.belongsTo(product,{
    foreignKey:'id_product',
    targetKey: 'id',
    onDelete:'RESTRICT'
});