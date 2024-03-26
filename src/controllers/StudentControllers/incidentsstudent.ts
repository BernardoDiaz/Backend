import { Request, Response } from 'express';
import { incidentsstudent } from '../../models/studentsModels/incidentsstudent';
import { student } from '../../models/studentsModels/student';
 
//Metodo Listar
export const getIncidents = async (req: Request, res: Response) => {

    //Generamos la lista
    const listIncidents = await incidentsstudent.findAll({
        attributes:['description','severity'],
        include:[{
            model:student,
            attributes:['name','lastname']
        }]
    });

    //Devolvemos la respuesta via JSON
    res.json(listIncidents);
};

export const getIncidentById = async (req: Request, res: Response) => {
    const { idStudent } = req.params;
    const one = await incidentsstudent.findAll({
        attributes:['description','severity'],
        where:{id_student:idStudent}});

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe un incidente que concuerde con la busqueda`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newIncident = async (req: Request, res: Response) => {
    const { id_student,description,severity} = req.body;

    try {
        incidentsstudent.create({
            id_student,
            description,
            severity
        });
        res.json({
            msg: `El incidente del alumno fue ingresado`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar el incidente",
            error
        });
    }

};

export const deleteIncident = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await incidentsstudent.findOne({ where: { id: id } });

    try {
        if (one) {
            await incidentsstudent.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El incidente no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el incidente`,
            error
        });
    }
};

export const updateIncident = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_student,description,severity } = req.body;

    const one = await incidentsstudent.findOne({ where: { id: id } });

    try {
        if (one) {
            await incidentsstudent.update({ id_student,description,severity }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro del incidente`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};