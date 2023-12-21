import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";


export const other_payment = sequelize.define('other_payment', {

   id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
   },
   name_fee: {
      type: DataTypes.STRING,
      allowNull: false
   },
   date_payments: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   payment_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
   }

});