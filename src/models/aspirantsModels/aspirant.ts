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
    },
        is_visible:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
       
}); 
 
degree.hasMany(aspirant,{
    foreignKey:'id_degree',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
aspirant.belongsTo(degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
    onDelete: 'CASCADE' 
});

aspirant.hasMany(consultation,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'CASCADE'
}); 

consultation.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'CASCADE'
});
aspirant.hasMany(interview,{
    foreignKey: 'id_aspirant',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

interview.belongsTo(aspirant,{
    foreignKey: 'id_aspirant',
    targetKey: 'id',
    onDelete: 'CASCADE'
});


//  aspirant.sync({alter:true});
// degree.sync({alter:true}); 