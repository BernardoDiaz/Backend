import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import sequelize from '../../db/connection';
import { registration } from '../../models/paymentsModels/registration';
import { degree } from '../../models/degree';

//Metodo Listar
export const getRegistration = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await registration.findAll();

        // Devolvemos la respuesta en formato JSON
        res.json(list);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getRegistrationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await registration.findByPk(id);

    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe un registro`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

//matriculas pendientes
export const getAlumnosOffRegistration = async (req: Request, res: Response) => {
    const list = await student.findAll({ where: { state: 'Matrícula Pendiente' } });
    // Devolvemos la respuesta en formato JSON
    res.json(list);
};
 
export const newRegistration = async (req: Request, res: Response) => {
    const { id_student, date_registration, payment_type, payment_amount } = req.body;

    try {
        registration.create({
            id_student: id_student,
            date_registration: date_registration,
            payment_type: payment_type,
            payment_amount: payment_amount
        });
        res.json({
            msg: `Matricula ingresada`
        });

    } catch (error) { 
        res.json({
            msg: "Ocurrio un error registrar la matricula",
            error
        });
    }

};

export const deleteRegistration = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await registration.findOne({ where: { id: id } });

    try {
        if (one) {
            await registration.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `La matricula ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateRegistration = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_student, date_registration, payment_type, payment_amount, } = req.body;

    const one = await registration.findOne({ where: { id: id } });

    try {
        if (one) {
            await student.update({ id_student, date_registration, payment_type,payment_amount }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro de matricula`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};

export const updateRegistrationActive = async (req: Request, res: Response) => {
    const { id } = req.params;
    const state  = 'Activo';

    const one = await student.findOne({ where: { id: id } });

    try {
        if (one) {
            await student.update({ state }, { where: { id: id } });
            res.json();
        } else {
            return res.status(404).json();
        }
    } catch (error) {
        return res.status(404).json(); 
    }
};