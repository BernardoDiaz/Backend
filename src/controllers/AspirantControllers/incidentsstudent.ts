import { Request, Response } from 'express';
import { incidentsstudent } from '../../models/studentsModels/incidentsstudent';

//Metodo Listar
export const getStudents = async (req: Request, res: Response) => {

    //Generamos la lista
    const listIncidents = await incidentsstudent.findAll();

    //Devolvemos la respuesta via JSON
    res.json(listIncidents);
};

export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneincident = await incidentsstudent.findByPk(id);

    //validacion de existencia
    try {
        if (oneincident) {
            res.json(oneincident);
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

export const newStudent = async (req: Request, res: Response) => {
    const { id_student,description,severity,date} = req.body;

    try {
        incidentsstudent.create({
            id_student,
            description,
            severity,
            date
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

export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneincident = await incidentsstudent.findOne({ where: { id: id } });

    try {
        if (oneincident) {
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

export const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_student,description,severity } = req.body;

    const oneincident = await incidentsstudent.findOne({ where: { id: id } });

    try {
        if (oneincident) {
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