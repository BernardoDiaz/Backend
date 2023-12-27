import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { degree } from "../degree";
import { student } from "../studentsModels/student";

export const registration = sequelize.define('registration', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student:{
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