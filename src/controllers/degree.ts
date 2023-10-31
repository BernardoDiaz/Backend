import { Request, Response } from "express";
import { degree } from "../models/degree";
import { seccion } from "../models/seccion";
import sequelize from "../db/connection";
import { level } from "../models/level";

//Metodo Listar
export const getDegrees = async (req: Request, res: Response) => {

    //Generamos la lista
    const listDegree = await degree.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: seccion, attributes: ['name'],
            where: { id: sequelize.col('seccion.id') },

        }, {
            model: level, attributes: ['name'],
            where: { id: sequelize.col('level.id') }
        }]
    });

    //Devolvemos la respuesta via JSON
    res.json(listDegree);
};

export const getDegreeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneDegree = await degree.findByPk(id);

    //validacion de existencia
    try {
        if (oneDegree) {
            res.json(oneDegree);
        } else {

            return res.status(404).json({
                msg: `No existe el grado`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el grado`
        });
    }


};

export const newDegree = async (req: Request, res: Response) => {

    const { name, id_seccion, id_level } = req.body;

    try {
        await degree.create({
            name: name,
            id_seccion: id_seccion,
            id_level: id_level
        });
        res.json({
            msg: `El ${name} fue creado exitosamente`
        });

    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear el nivel",
            error
        });
    }
};

export const deleteDegree = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneDegree = await degree.findOne({ where: { id: id } });

    try {
        if (oneDegree) {
            await degree.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El grado ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar, si hay una seccion vinculada al grado, no te sera posible eliminarlo comunicate con el encargado de IT para verificar la situacion`,
            error
        });
    }
};

export const updateDegree = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, id_seccion, id_level } = req.body;

    const oneDegree = await degree.findOne({ where: { id: id } });

    try {
        if (oneDegree) {
            await degree.update({ name, id_seccion, id_level }, { where: { id: id } });
            res.json({
                msg: `Grado actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el grado`,
            error
        });
    }
};