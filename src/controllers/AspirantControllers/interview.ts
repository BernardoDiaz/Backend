import { Request, Response } from 'express';
import { aspirant } from '../../models/aspirantsModels/aspirant';
import sequelize from '../../db/connection';
import { interview } from '../../models/aspirantsModels/interview';
import { Sequelize } from 'sequelize';

//Metodo Listar
export const getInterviews = async (req: Request, res: Response) => {

    //Generamos la lista
    const listInterviews = await interview.findAll({
        include: {
            model: aspirant, attributes: ['aspirant_fullname'],
            where: { id: sequelize.col('interview.id') }
        }
    });

    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
};

export const getInterviewsPendient = async (req: Request, res: Response) => {

    //Generamos la lista
    const listInterviews = await interview.findAll({
        include: {
          model: aspirant,
          attributes: ['aspirant_fullname'],
          where: { id: sequelize.col('interview.id') }
        },
        where: { state: 'Pendiente' }
    });

    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
};

export const getAspirantsFilter = async (req: Request, res: Response) => {

    //  const listAspirantsfl = await aspirant.findAll(
    //      {attributes:['id','aspirant_fullname']});

    
    const listAspirantsfl = await interview.findAll({
        attributes: ['id',[Sequelize.col('aspirant.id'), 'id_aspirant'], [Sequelize.col('aspirant.aspirant_fullname'), 'aspirant_fullname']],
        include: [{
          model: aspirant,
          attributes: []   
        }],
        where: {
          state: 'Pendiente',
        },
      });
    //Devolvemos la respuesta via JSON
    res.json(listAspirantsfl);
};

export const getInterviewById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await interview.findByPk(id);

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
    const { id_aspirant, comments, state } = req.body;

    try {
        interview.create({
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
    const one = await interview.findOne({ where: { id: id } });

    try {
        if (one) {
            await interview.destroy({ where: { id: id } });
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
    const { id_aspirant, comments, state } = req.body;

    const one = await interview.findOne({ where: { id: id } });

    try {
        if (one) {
            await interview.update({ id_aspirant, comments, state }, { where: { id: id } });
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