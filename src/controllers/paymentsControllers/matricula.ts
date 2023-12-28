import { Response,Request } from "express";
import { registration } from "../../models/paymentsModels/matricula";
import { student } from "../../models/studentsModels/student";
import sequelize from "../../db/connection";
import { degree } from "../../models/degree";


export const get = async (req:Request,res:Response) => {
    try{
    const list = await registration.findAll({
        include:{
            model:student,
            attributes:['name','lastname'],
            where:{id: sequelize.col('student.id')},
            include:[{
                model:degree,
                attributes:['name'],
                where:{id: sequelize.col('registration.id_degree')}
            }]
        }});

    res.json(list);
    }catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

