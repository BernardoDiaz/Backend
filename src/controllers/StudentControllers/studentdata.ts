import { Request, Response } from 'express';
import { studentdata } from '../../models/studentsModels/studentdata';

//Metodo Listar 
export const getStudentDatas = async (req: Request, res: Response) => {

    //Generamos la lista
    const listStudents = await studentdata.findAll();

    //Devolvemos la respuesta via JSON
    res.json(listStudents);
};

export const getStudentDataById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await studentdata.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe un alumno`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el alumno`
        });
    }


};

export const newStudentData = async (req: Request, res: Response) => {
    const { id_student} = req.body;

    try {
        studentdata.create({
            id_student
        });
        res.json({
            msg: `La informacion del alumno fue ingresado`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la informacion del alumno",
            error
        });
    }

};

export const deleteStudentData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await studentdata.findOne({ where: { id: id } });

    try {
        if (one) {
            await studentdata.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `La informacion del alumno ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateStudentData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_student } = req.body;

    const one = await studentdata.findOne({ where: { id: id } });

    try {
        if (one) {
            await studentdata.update({ id_student }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe informacion`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};