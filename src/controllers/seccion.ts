import { Response, Request } from "express";
import { seccion } from "../models/seccion";

export const getSeccions = async (req: Request, res: Response) => {

    const listSeccion = await seccion.findAll({attributes:['id', 'name']});

    res.json(listSeccion);

}; 

export const getSeccionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneSeccion = await seccion.findByPk(id);

    //validacion de existencia
    try {
        if (oneSeccion) {
            res.json(oneSeccion);
        } else {

            return res.status(404).json({
                msg: `No existe la seccion`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar la seccion`
        });
    }
};

export const newSeccion = async (req: Request, res: Response) => {

    const { name } = req.body;

    const namevalid = await seccion.findOne({ where: { name: name } });

    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe una seccion registrada como ${name}`
        });
    }

    //Guardar Seccion en bd
    try {
        await seccion.create({
            name: name
        });
        res.json({
            msg: `Seccion ${name} creada exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear la seccion",
            error
        });
    }
};

export const deleteSeccion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneSeccion = await seccion.findOne({where:{id:id}});

    try {
        if (oneSeccion) {
            await seccion.destroy({where:{id:id}});
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `La seccion, ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar la seccion`,
            error
        });
    }
};

export const updateSeccion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const oneSeccion = await seccion.findOne({ where: { id: id } });

    try {
        if (oneSeccion) {
            await seccion.update({ name }, { where: { id: id } });
            res.json({
                msg: `La seccion, se actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No se puede editar la seccion: ${name} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la seccion`,
            error
        });
    }
};