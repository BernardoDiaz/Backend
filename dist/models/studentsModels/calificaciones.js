"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const connection_1 = __importDefault(require("../../db/connection"));
// Define los modelos (tablas)
const Subject = connection_1.default.define('Subject', {
    name: Sequelize.STRING,
    abbreviation: Sequelize.STRING,
});
const Level = connection_1.default.define('Level', {
    name: Sequelize.STRING,
    principal: Sequelize.STRING,
});
const Grade = connection_1.default.define('Grade', {
    name: Sequelize.STRING,
    observation: Sequelize.STRING,
});
const StaffType = connection_1.default.define('StaffType', {
    name: Sequelize.STRING,
});
const Staff = connection_1.default.define('Staff', {
    // Define los campos para el personal
    // ...
    // Relaciones
    staffTypeId: {
        type: Sequelize.INTEGER,
        references: {
            model: StaffType,
            key: 'id',
        },
    },
});
const GradeParalelo = connection_1.default.define('GradeParalelo', {
    name: Sequelize.STRING,
});
const Student = connection_1.default.define('Student', {
    // Define los campos para los estudiantes
    // ...
    // Relaciones
    gradeParaleloId: {
        type: Sequelize.INTEGER,
        references: {
            model: GradeParalelo,
            key: 'id',
        },
    },
});
const Attendance = connection_1.default.define('Attendance', {
    attended: Sequelize.STRING,
    date: Sequelize.DATE,
});
const SubjectGrade = connection_1.default.define('SubjectGrade', {
    // Relaciones
    gradeId: {
        type: Sequelize.INTEGER,
        references: {
            model: Grade,
            key: 'id',
        },
    },
    subjectId: {
        type: Sequelize.INTEGER,
        references: {
            model: Subject,
            key: 'id',
        },
    },
});
const ScoreRecord = connection_1.default.define('ScoreRecord', {
    firstTrimester: Sequelize.INTEGER,
    secondTrimester: Sequelize.INTEGER,
    thirdTrimester: Sequelize.INTEGER,
    finalGrade: Sequelize.INTEGER,
    year: Sequelize.STRING,
});
// Define las relaciones entre los modelos
Level.hasMany(Grade);
Grade.belongsTo(Level);
StaffType.hasMany(Staff);
Staff.belongsTo(StaffType);
Grade.hasMany(GradeParalelo);
GradeParalelo.belongsTo(Grade);
GradeParalelo.hasMany(Student);
Student.belongsTo(GradeParalelo);
Student.hasMany(Attendance);
Attendance.belongsTo(Student);
Student.hasMany(SubjectGrade);
SubjectGrade.belongsTo(Student);
Subject.hasMany(SubjectGrade);
SubjectGrade.belongsTo(Subject);
Grade.hasMany(SubjectGrade);
SubjectGrade.belongsTo(Grade);
// Sincroniza los modelos con la base de datos
connection_1.default.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
