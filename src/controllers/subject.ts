import { Response, Request } from "express";
import { subject } from "../models/subject";

export const getSubjects = async (req: Request, res: Response) => {

    const list = await subject.findAll({ attributes: ['id', 'name'] });

    res.json(list);
}

export const getSubjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await subject.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const deleteSubject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await subject.findOne({ where: { id: id } });

    try {
        if (one) {
            await subject.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `Ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateSubject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const one = await subject.findOne({ where: { id: id } });

    try {
        if (one) {
            await subject.update({ name }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe ${name} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};

export const newSubject = async (req: Request, res: Response) => {

    try {
        const asignacionGrado =
            req.body.asignacionGrado.map((materia: any) => ({
                nameSubject: materia.nameSubject,
                id_degree: materia.id_degree
            }));
        await subject.bulkCreate(asignacionGrado);

        res.json({
            msg: `Materias Asignadas`
        });

    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error`,
            error
        });
    }
}; 