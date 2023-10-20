import { Request, Response } from 'express';
import { ratingstudent } from '../../models/studentsModels/ratingstudent';

//Metodo Listar
export const getRatings = async (req: Request, res: Response) => {

    //Generamos la lista
    const listRatings = await ratingstudent.findAll();

    //Devolvemos la respuesta via JSON
    res.json(listRatings);
};

export const getRatingById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await ratingstudent.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe un registro de notas que concuerde con la busqueda`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newRating = async (req: Request, res: Response) => {
    const { id_student,id_subject,id_typerating,rating,date} = req.body;

    try {
        ratingstudent.create({
            id_student,
            id_subject,
            id_typerating,
            rating,
            date
        });
        res.json({
            msg: `La calificacion del alumno fue ingresada`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la calificacion",
            error
        });
    }

};

export const deleteRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await ratingstudent.findOne({ where: { id: id } });

    try {
        if (one) {
            await ratingstudent.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        } else {
            res.status(404).json({
                msg: `La calificacion no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la calificacion`,
            error
        });
    }
};

export const updateRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  id_student,id_subject,id_typerating,rating,date } = req.body;

    const one = await ratingstudent.findOne({ where: { id: id } });

    try {
        if (one) {
            await ratingstudent.update({ id_student,id_subject,id_typerating,rating,date }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro que actualizar`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};