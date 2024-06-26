import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { degree } from "../degree";
import { consultation } from "./consultation";
import { interview } from "./interview";

 export const aspirant = sequelize.define('aspirant', {
    id:{
        type: DataTypes.STRING,  
        primaryKey:true,
        unique:true
    },
    manager:{
        type: DataTypes.STRING,
        allowNull:false
    },
    manager_phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    manager_email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    adress:{
        type: DataTypes.STRING,
        allowNull: true
    },
    aspirant_fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_degree:{
        type:DataTypes.INTEGER,
        allowNull:true
    } 
}); 

degree.hasMany(aspirant,{
    foreignKey:'id_degree',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
aspirant.belongsTo(degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});

aspirant.hasMany(consultation,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

consultation.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});
aspirant.hasMany(interview,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

interview.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'set null'
});


//  aspirant.sync({alter:true});
// degree.sync({alter:true});