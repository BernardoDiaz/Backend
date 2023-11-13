import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import { degree } from '../../models/degree';
import sequelize from '../../db/connection';
import { seccion } from '../../models/seccion';

//Metodo Listar
export const getStudents = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const listaEstudiantes = await student.findAll({
            attributes: ['id', 'name', 'lastname'],
            include: [
                {
                    model: degree,
                    attributes: ['name'],
                    where: { id: sequelize.col('degree.id') },
                    include: [
                        {
                            model: seccion,
                            attributes: ['name'],
                            where: { id: sequelize.col('degree.id_seccion') }
                        }
                    ]
                }]
        });

        // Devolvemos la respuesta en formato JSON
        res.json(listaEstudiantes);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await student.findByPk(id);

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

export const newStudent = async (req: Request, res: Response) => {
    const { name, lastname, id_degree, year } = req.body;

    try {
        student.create({
            name: name,
            lastname: lastname,
            id_degree: id_degree,
            year: year
        });
        res.json({
            msg: `El alumno ${name + '' + lastname} fue ingresado`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un alumno",
            error
        });
    }

};

export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await student.findOne({ where: { id: id } });

    try {
        if (one) {
            await student.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El alumno ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastname, id_degree } = req.body;

    const one = await student.findOne({ where: { id: id } });

    try {
        if (one) {
            await student.update({ name, lastname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro del alumno: ${name + '' + lastname} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};