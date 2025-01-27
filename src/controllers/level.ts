import { Response, Request } from "express";
import { level } from "../models/level";
import { degree } from "../models/degree";
import { seccion } from "../models/seccion";
import { Model, Op } from "sequelize";
import { subject } from "../models/subject";

export const getLevels = async (req: Request, res: Response) => {

    const listLevel = await level.findAll({
        attributes: ['id', 'name', 'priceRegistration', 'periodsToEvaluate'],
        order: [['id', 'ASC']]
    });

    res.json(listLevel);
}

export const getLevelById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneLevel = await level.findByPk(id);

    //validacion de existencia
    try {
        if (oneLevel) {
            res.json(oneLevel);
        } else {

            return res.status(404).json({
                msg: `No existe el nivel academico`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el nivel academico`
        });
    }


};

export const newLevel = async (req: Request, res: Response) => {

    const { name, priceRegistration,periodsToEvaluate } = req.body;

    //Validar nombre unico de nivel
    const namevalid = await level.findOne({ where: { name: name } });

    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe un nivel registrado como ${name}`
        });
    };

    //Guardando nivel en bd
    try {
        await level.create({
            name,
            priceRegistration,
            periodsToEvaluate
        });

        res.json({
            msg: `El nivel ${name} creado exitosamente`
        });

    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear el nivel",
            error
        });
    }
};

export const deleteLevel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneLevel = await level.findOne({ where: { id: id } });

    try {
        if (oneLevel) {
            await level.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El nivel academico, ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `El nivel esta asignado no es posible eliminarlo`,
            error
        });
    }
};

export const updateLevel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, priceRegistration,periodsToEvaluate } = req.body;

    const oneLevel = await level.findOne({ where: { id: id } });

    try {
        if (oneLevel) {
            await level.update({ name, priceRegistration,periodsToEvaluate }, { where: { id: id } });
            res.json({
                msg: `Nivel academico, actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe el nivel academico: ${name} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el nivel academico,`,
            error
        });
    }
};


interface IDSubjectDegree {
    id_degree: number;
    // Agrega aquí cualquier otro campo que necesites
}

export const getDegree = async (req: Request, res: Response) => {

    const idDegrees = await subject.findAll({ attributes: ['id_degree'] });

    // Extraemos solo los valores de id_degree
    const idDegreeValues = idDegrees.map((subject: Model) => {
        const SubjectDegreeValue: IDSubjectDegree = subject.get({ plain: true });
        return SubjectDegreeValue.id_degree;
    });

    try {
        const { idLevel } = req.params;
        //Generamos la lista
        const list = await degree.findAll({
            attributes: ['id', 'name'],
            include: [{ model: seccion, attributes: ['name'] }],
            where: { id_level: idLevel, id:{[Op.notIn]:idDegreeValues} }
        });

        //Devolvemos la respuesta via JSON
        res.json(list);
    } catch (error) {
        return res.status(404).json({
            msg: `Grados no encontrados`,
            error
        });
    }
};