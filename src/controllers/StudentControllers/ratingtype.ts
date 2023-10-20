import { Request, Response } from 'express';
import { ratingtype } from '../../models/studentsModels/ratingtype';

//Metodo Listar
export const getRatingTypes = async (req: Request, res: Response) => {

    //Generamos la lista
    const listRatingTypes = await ratingtype.findAll();

    //Devolvemos la respuesta via JSON
    res.json(listRatingTypes);
};

export const getRatingTypeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await ratingtype.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe un tipo de nota que concuerde con la busqueda`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newRatingType = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        ratingtype.create({
            name
        });
        res.json({
            msg: `El tipo de nota fue ingresado`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar el tipo de nota",
            error
        });
    }

};

export const deleteRatingType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await ratingtype.findOne({ where: { id: id } });

    try {
        if (one) {
            await ratingtype.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        } else {
            res.status(404).json({
                msg: `El tipo de nota no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el tipo de nota`,
            error
        });
    }
};

export const updateRatingType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  id_student,id_subject,id_typerating,rating,date } = req.body;

    const one = await ratingtype.findOne({ where: { id: id } });

    try {
        if (one) {
            await ratingtype.update({ id_student,id_subject,id_typerating,rating,date }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un tipo de nota que actualizar`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};