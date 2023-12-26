import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { product } from "./product";

export const category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_product:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

product.belongsTo(category, {
    foreignKey: 'id_product',
    targetKey: 'id',
    onDelete: 'restrict'
});
category.hasMany(product, {
    foreignKey: 'id_product',
    sourceKey: 'id',
    onDelete: 'restrict'
});