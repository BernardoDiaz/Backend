import { Request, Response } from "express";
import { level } from "../models/level";
import { teacher } from "../models/teacher";
import { degree } from "../models/degree";
import { seccion } from "../models/seccion";

//Metodo Listar
export const getTeacher = async (req: Request, res: Response) => {

    //Generamos la lista
    const list = await teacher.findAll({
        attributes: ['id', 'name','lastname','id_level'],
       });

    //Devolvemos la respuesta via JSON
    res.json(list);
};

export const getDegreeTeacher = async (req: Request, res: Response) => {

    const {id_levelSearch} = req.params;
    //Generamos la lista
    const list = await level.findAll({
            attributes:['id'],
            where:{id:id_levelSearch},
            include:[{
                model:degree,
                attributes:['id','name'],
                include:[{
                    model:seccion,
                    attributes:['name']
                }]
            }]  
    });

    //Devolvemos la respuesta via JSON
    res.json(list);
};

export const newTeacher = async (req: Request, res: Response) => {

    const { name, lastname, id_level } = req.body;

    try {
        await teacher.create({
            name: name,
            lastname:lastname,
            id_level: id_level
        });
        res.json({
            msg: `El Maestro ${name} fue creado exitosamente`
        });

    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear",
            error
        });
    }
};
