import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "../studentsModels/student";
import { product } from "./product";


export const payment = sequelize.define('payment', {

   id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true
   },
   id_student: {
      type: DataTypes.INTEGER,
      allowNull: false

   },
   id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   payment_type:{ 
      type:DataTypes.STRING,
      allowNull:false
  },
   payment_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
   },
   date_payments: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   state:{
      type:DataTypes.STRING,
      allowNull:false
   }
});

student.hasMany(payment, {
   foreignKey: 'id_student',
   sourceKey: 'id',
   onDelete: 'restrict'
});
payment.belongsTo(student, {
   foreignKey: 'id_student',
   targetKey: 'id',
   onDelete: 'restrict'
});

product.hasMany(payment,{
   foreignKey: 'id_product',
   sourceKey: 'id',
   onDelete: 'restrict'
});
payment.belongsTo(product,{
   foreignKey: 'id_product',
   targetKey: 'id',
   onDelete: 'restrict'
});