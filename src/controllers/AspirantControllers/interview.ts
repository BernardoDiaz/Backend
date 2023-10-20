import { Request, Response } from 'express';
import { consultation } from '../../models/aspirantsModels/consultation';

//Metodo Listar
export const getInterviews = async (req: Request, res: Response) => {

    //Generamos la lista
    const listInterviews = await consultation.findAll();

    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
};

export const getInterviewById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await consultation.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe una entrevista que concuerde con la busqueda`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newInterview = async (req: Request, res: Response) => {
    const { id_aspirant,comments,state} = req.body;

    try {
        consultation.create({
            id_aspirant,
            comments,
            state
        });
        res.json({
            msg: `La entrevista del aspirante fue ingresada`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la entrevista",
            error
        });
    }

};

export const deleteInterview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await consultation.findOne({ where: { id: id } });

    try {
        if (one) {
            await consultation.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminada con exito`
            });
        } else {
            res.status(404).json({
                msg: `La entrevista no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la entrevista`,
            error
        });
    }
};

export const updateInterview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_aspirant,comments,state } = req.body;

    const one = await consultation.findOne({ where: { id: id } });

    try {
        if (one) {
            await consultation.update({ id_aspirant,comments,state }, { where: { id: id } });
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