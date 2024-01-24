import { Response,Request } from "express";
import { DegreeAssignment } from "../../models/intermediateModels/teacherDegree";
import { teacher } from "../../models/teacher";
import { degree } from "../../models/degree";
import { seccion } from "../../models/seccion";
import { level } from "../../models/level";
 

export const getTeachers =async (req:Request,res:Response) => {
    
    try {
        const list = await teacher.findAll({
            attributes:['name','lastname'],
            include:[{
                model:level,
                attributes:['name']
            }]
        });
            res.json(list);
        
    } catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
};

export const getTD = async (req:Request,res:Response) => {
    try {
        const list = await DegreeAssignment.findAll({
            attributes:['id','year'],
            include:[{
                model:teacher,
                attributes:['name','lastname']
            },{
                model:degree,
                attributes:['name'],
                include:[{
                    model:seccion,
                    attributes:['name']
                }]
            }]
        });
            res.json(list);
        
    } catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
};

export const newTD = async (req:Request,res:Response) => {
    
    const {id_teacher,id_degree,year} = req.body;
    try {
        await DegreeAssignment.create({
            id_teacher,
            id_degree,
            year
        });
        res.json({
            msg:` Grado asignado exitosamente`
        });
    } catch (error) {
        res.json({
            msg:'No se puedo asignar el grado',
            error
        });
    }
};
