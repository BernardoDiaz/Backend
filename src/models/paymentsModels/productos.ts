import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { category } from "./categorias";

export const product = sequelize.define('product', {
    //PRODUCTOS GENERICOS 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameProduct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    id_category:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    
});

category.hasMany(product,{
    foreignKey:'id_category',
    sourceKey:'id',
    onDelete:'RESTRICT'
});

product.belongsTo(category,{
    foreignKey:'id_category',
    targetKey: 'id',
    onDelete:'RESTRICT'
});
