import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { degree } from "../degree";
import { teacher } from "../teacher";

export const DegreeAssignment = sequelize.define('DegreeAssignment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        autoIncrement:true
    },
    id_teacher:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_degree:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

degree.hasOne(DegreeAssignment, {
    foreignKey: 'id_degree',
    sourceKey: 'id',
     onDelete: 'NO ACTION'
});

DegreeAssignment.belongsTo(degree, {
    foreignKey: 'id_degree',
    targetKey: 'id',
     onDelete: 'NO ACTION'
});

teacher.hasOne(DegreeAssignment, {
    foreignKey: 'id_teacher',
    sourceKey: 'id',
     onDelete: 'NO ACTION'
});

DegreeAssignment.belongsTo(teacher, {
    foreignKey: 'id_teacher',
    targetKey: 'id',
     onDelete: 'NO ACTION' 
}); 