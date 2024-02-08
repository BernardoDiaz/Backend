import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { level } from "../models/level";
import { teacher } from "../models/teacher";
import { degree } from "../models/degree";
import { seccion } from "../models/seccion";
import { DegreeAssignment } from "../models/intermediateModels/teacherDegree";
import { Model, Op } from "sequelize";

//Metodo Listar
export const getTeacher = async (req: Request, res: Response) => {

    //Generamos la lista
    const list = await teacher.findAll({
        attributes: ['id', 'name', 'lastname', 'id_level', 'state'],
        where:{state:true}
    });

    //Devolvemos la respuesta via JSON
    res.json(list);
};

interface IDegreeAssignment {
    id_degree: number;
    // Agrega aquí cualquier otro campo que necesites
}

export const getDegreeTeacher = async (req: Request, res: Response) => {

    const idDegrees = await DegreeAssignment.findAll({ attributes: ['id_degree'] });

    // Extraemos solo los valores de id_degree
    const idDegreeValues = idDegrees.map((degreeAssignment: Model) => {
        const degreeAssignmentValue: IDegreeAssignment = degreeAssignment.get({ plain: true });
        return degreeAssignmentValue.id_degree;
    });

    const { id_levelSearch } = req.params;
    //Generamos la lista
    const list = await level.findAll({
        attributes: ['id'],
        where: { id: id_levelSearch },
        include: [{
            model: degree,
            attributes: ['id', 'name'],
            include: [{
                model: seccion,
                attributes: ['name']
            }],
            where: {
                id: {
                    [Op.notIn]: idDegreeValues // Usamos notIn en lugar de ne
                }
            }
        }]
    });

    //Devolvemos la respuesta via JSON
    res.json(list);
};

export const newTeacher = async (req: Request, res: Response) => {

    const { name, lastname, password, id_level } = req.body;

      //Validacion de usuario
      const uservalid = await teacher.findOne({ where: { name: name } });

      if (uservalid) {
          return res.status(400).json({
              msg: `Ya existe un usuario con el nombre ${name}`
          });
      }

    const hastPassword = await bcrypt.hash(password, 10);
    try {
        await teacher.create({
            name: name,
            lastname: lastname,
            password: hastPassword,
            id_level: id_level
        });
        res.json({
            msg: `El Maestro ${name} fue creado exitosamente`
        });

    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear",
            error
        });
    }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await teacher.findOne({ where: { id: id } });

    try {
        if (one) {
            await teacher.destroy({ where: { id: id } });
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
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastname, id_level } = req.body;

    const one = await teacher.findOne({ where: { id: id } });

    try {
        if (one) {
            await teacher.update({ name, lastname, id_level }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};

export const stateTeacher = async (req: Request, res: Response) => {

    const { id } = req.params;

    const one = await teacher.findOne({ where: { id: id } });

    try {
        if (one) {
            const currentState = one.get('state');
            const newState = !currentState;
            await teacher.update({ state: newState }, { where: { id: id } });
            res.json({
                msg: `Cambio Realizado`
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error`,
            error
        });
    }
}