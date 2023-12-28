import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { degree } from "../degree";
import { student } from "../studentsModels/student";
import { level } from "../level";

export const registration = sequelize.define('registration', {

    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.STRING,
        allowNull:false
    },
    id_degree:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_level:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

student.hasMany(registration,{
    foreignKey:'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});
registration.belongsTo(student,{
    foreignKey: 'id_student',
    targetKey: 'id',
    onDelete: 'RESTRICT'
});

degree.hasMany(registration,{
    foreignKey: 'id_degree',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

registration.belongsTo(degree,{
    foreignKey:'id_degree',
    targetKey: 'id',
    onDelete: 'RESTRICT' 
}); 

level.hasMany(registration,{
    foreignKey: 'id_level',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});

registration.belongsTo(level,{
    foreignKey:'id_level',
    targetKey: 'id',
    onDelete: 'RESTRICT' 
});  