import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";
import { student } from "./student";

export const studentdata = sequelize.define('studentdata',{
    id:{ 
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_student:{
        type:DataTypes.STRING,
        allowNull:true
    },
    //datos del alumno de ficha Liceo Rey David
    A_nombres:{
        type:DataTypes.STRING
    },  
    A_apellidos:{
        type:DataTypes.STRING
    },
    A_grado:{
        type:DataTypes.STRING
    },
    A_seccion:{
        type:DataTypes.STRING
    },
    A_nie:{
        type:DataTypes.INTEGER
    },                  
    A_fnacimiento:{
        type:DataTypes.DATEONLY
    },          
    A_transporte:{
        type:DataTypes.STRING
    },
    A_genero:{
        type:DataTypes.STRING
    },
    A_estadocivil:{
        type:DataTypes.STRING
    },          
    A_nacionalidad:{
        type:DataTypes.STRING
    },         
    A_extranjero: {
        type:DataTypes.BOOLEAN
    },          
    enfermedades: {
        type:DataTypes.STRING
    },          
    discapacidad:{
        type:DataTypes.STRING
    },          
    detalldiscapacidad:{
        type:DataTypes.STRING
    },     
    diagnosticoclinico:{
        type:DataTypes.STRING
    },     
    medicamentopermanente:{
        type:DataTypes.STRING
    },  
    direccion: {
        type:DataTypes.STRING
    },  
    departamento: {
        type:DataTypes.STRING
    },  
    municipio:{
        type:DataTypes.STRING
    },              
    canton:  {
        type:DataTypes.STRING
    },               
    telefonohogar:{
        type:DataTypes.INTEGER
    },          
    emailhogar: {
        type:DataTypes.STRING
    },        
    zona:{
        type:DataTypes.STRING
    },                 
    tipovivienda:{
        type:DataTypes.STRING
    },           
    accesointernet:{
        type:DataTypes.STRING
    },        
    conexioninternet:{
        type:DataTypes.STRING
    },      
    computadora: {
        type:DataTypes.STRING
    },          
    numfamilia:{
        type:DataTypes.INTEGER
    },           
    trabaja:{
        type:DataTypes.STRING
    },              
    tipotrabajo:{
        type:DataTypes.STRING
    },           
    hijos: {
        type:DataTypes.STRING
    },                
    convivencia:{
        type:DataTypes.STRING
    },            
    economia:{
        type:DataTypes.STRING
    },             
    P_nombres:  {
        type:DataTypes.STRING
    },          
    P_apellidos:{
        type:DataTypes.STRING
    },           
    P_dui:   {
        type:DataTypes.INTEGER
    },             
    P_telefono: {
        type:DataTypes.INTEGER
    },          
    P_celular:{
        type:DataTypes.STRING
    },            
    P_correo: {
        type:DataTypes.STRING
    },             
    P_lugartrabajo: {
        type:DataTypes.STRING
    },       
    P_profesion: {
        type:DataTypes.STRING
    },          
    P_estadocivil:{
        type:DataTypes.STRING
    },          
    P_fnacimiento:{
        type:DataTypes.DATEONLY
    },         
    P_municipionacimiento:{
        type:DataTypes.STRING
    },  
    P_escolaridad:{
        type:DataTypes.STRING
    },         
    P_encargado:{
        type:DataTypes.BOOLEAN
    },           
    M_nombres:{
        type:DataTypes.STRING
    },            
    M_apellidos: {
        type:DataTypes.STRING
    },          
    M_dui:{
        type:DataTypes.INTEGER
    },                
    M_telefono: {
        type:DataTypes.INTEGER
    },          
    M_celular:{
        type:DataTypes.INTEGER
    },              
    M_correo: {
        type:DataTypes.STRING
    },              
    M_lugartrabajo:{
        type:DataTypes.STRING
    },       
    M_profesion: {
        type:DataTypes.STRING
    },         
    M_estadocivil: {
        type:DataTypes.STRING
    },       
    M_fnacimiento: {
        type:DataTypes.DATEONLY
    },        
    M_municipionacimiento:{
        type:DataTypes.STRING
    }, 
    M_escolaridad:{
        type:DataTypes.STRING
    },         
    M_encargado:{
        type:DataTypes.BOOLEAN
    },            
    RP_nombres:{
        type:DataTypes.STRING
    },             
    RP_apellidos:{
        type:DataTypes.STRING
    },          
    RP_dui:{
        type:DataTypes.INTEGER
    },                 
    RP_telefono:{
        type:DataTypes.INTEGER
    },           
    RP_celular:{
        type:DataTypes.INTEGER
    },             
    RP_correo:{
        type:DataTypes.STRING
    },              
    RP_lugartrabajo:{
        type:DataTypes.STRING
    },        
    RP_profesion:{
        type:DataTypes.STRING
    },          
    RP_estadocivil: {
        type:DataTypes.STRING
    },       
    RP_fnacimiento:{
        type:DataTypes.DATEONLY
    },        
    RP_municipionacimiento:{
        type:DataTypes.STRING
    }, 
    RP_escolaridad:{
        type:DataTypes.STRING
    },       
    H1_nombres: {
        type:DataTypes.STRING
    },        
    H1_grado:{
        type:DataTypes.STRING
    },          
    H2_nombres: {
        type:DataTypes.STRING
    },            
    H2_grado:{
        type:DataTypes.STRING
    },              
    H3_nombres: {
        type:DataTypes.STRING
    },           
    H3_grado: {
        type:DataTypes.STRING
    },             
});

student.hasOne(studentdata, {
    foreignKey: 'id_student',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
});