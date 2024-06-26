import { Request, Response } from 'express';
import { consultation } from '../../models/aspirantsModels/consultation';
import { aspirant } from '../../models/aspirantsModels/aspirant';
import sequelize from '../../db/connection';
import { Sequelize } from 'sequelize';
 
//Metodo Listar
export const getConsultations = async (req: Request, res: Response) => {

    //Generamos la lista
    const listConsultations = await consultation.findAll({
        attributes:['id','comments','state'],
        include: {
            model: aspirant, attributes: ['aspirant_fullname'],
            where: { id: sequelize.col('consultation.id') }
        }
    });

    //Devolvemos la respuesta via JSON
    res.json(listConsultations);
};

export const getConsultationsPendient = async (req: Request, res: Response) => {

    //Generamos la lista
    const listInterviews = await consultation.findAll({
        include: {
          model: aspirant,
          attributes: ['aspirant_fullname'],
          where: { id: sequelize.col('consultation.id') }
        },
        // where: { state: 'Pendiente' }
    });

    //Devolvemos la respuesta via JSON
    res.json(listInterviews);
};


export const getAspirantsFilter = async (req: Request, res: Response) => {


    const listAspirantsfl = await consultation.findAll({
        attributes: ['id',[Sequelize.col('aspirant.id'), 'id'], [Sequelize.col('aspirant.aspirant_fullname'), 'aspirant_fullname']],
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

export const getConsultationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await consultation.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe una cita medica que concuerde con la busqueda`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newConsultation = async (req: Request, res: Response) => {
    const { id_aspirant, comments, state } = req.body;

    try {
        consultation.create({
            id_aspirant,
            comments,
            state
        });
        res.json({
            msg: `La cita medica del aspirante fue ingresada`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la entrevista",
            error
        });
    }

};

export const deleteConsultation = async (req: Request, res: Response) => {
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
                msg: `La cita medica no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la cita medica`,
            error
        });
    }
};

export const updateConsultation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_aspirant, comments, state } = req.body;

    const one = await consultation.findOne({ where: { id: id } });

    try {
        if (one) {
            await consultation.update({ id_aspirant, comments, state }, { where: { id: id } });
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