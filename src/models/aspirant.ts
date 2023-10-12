import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { degree } from "./degree";
import { consultation } from "./consultation";
import { interview } from "./interview";

 export const aspirant = sequelize.define('aspirant', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
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
    onDelete: 'set null'
});
aspirant.belongsTo(degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'set null'
});

aspirant.hasMany(consultation,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'set null'
});

consultation.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'set null'
});
aspirant.hasMany(interview,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'set null'
});

interview.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'set null'
});


//  aspirant.sync({alter:true});
// degree.sync({alter:true});