import { Request, Response } from 'express';
import { aspirant } from '../../models/aspirantsModels/aspirant';
import sequelize from '../../db/connection';
import { degree } from '../../models/degree';
import shortid from 'shortid';
import { interview } from '../../models/aspirantsModels/interview';
import { consultation } from '../../models/aspirantsModels/consultation';
 
//Metodo Listar
export const getAspirants = async (req: Request, res: Response) => {

    //Generamos la lista
    const listAspirants = await aspirant.findAll({include: {
        model: degree, attributes: ['name'],
        where: { id: sequelize.col('degree.id') }
    }});

    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
};

export const getAspirantById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneaspirant = await aspirant.findByPk(id);

    //validacion de existencia
    try { 
        if (oneaspirant) {
            res.json(oneaspirant);
        } else {

            return res.status(404).json({
                msg: `No existe un aspirante`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el aspirante`
        });
    }


};

export const newAspirant = async (req: Request, res: Response) => {
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    const id = shortid.generate();
    try {
        aspirant.create({
            id:id,
            manager: manager,
            manager_phone: manager_phone,
            manager_email: manager_email,
            adress: adress,
            aspirant_fullname: aspirant_fullname,
            id_degree: id_degree
        });
        interview.create({
            id_aspirant:id
        });
        consultation.create({
            id_aspirant:id
        }); 

        res.json({
            msg: `El aspirante ${aspirant_fullname} fue inscrito en el proceso de seleccion`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un aspirante",
            error
        });
    }

};

export const deleteAspirant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneaspirant = await aspirant.findOne({where:{id:id}});

    try {
        if (oneaspirant) {
            await aspirant.destroy({where:{id:id}});
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El aspirante ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el aspirante`,
            error
        });
    }
};

export const updateAspirant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;

    const oneaspirant = await aspirant.findOne({ where: { id: id } });

    try {
        if (oneaspirant) {
            await aspirant.update({ manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el aspirante`,
            error
        });
    }
};