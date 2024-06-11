import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const consultation = sequelize.define('consultation', {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey:true,
        autoIncrement:true
    },
    id_aspirant:{
        type:DataTypes.STRING,
        allowNull:true
    }, 
    comments:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Sin Evaluar"
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'Pendiente'
    }
});