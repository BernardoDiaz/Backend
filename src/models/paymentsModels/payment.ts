import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "../studentsModels/student";


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
   payment_fee: {
      type: DataTypes.STRING,
      allowNull: false
   },
   payment_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
   },
   date_payments: {
      type: DataTypes.DATEONLY,
      allowNull: false
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