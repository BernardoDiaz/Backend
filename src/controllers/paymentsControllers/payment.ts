import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import sequelize from '../../db/connection';
import { degree } from '../../models/degree';
import { payment } from '../../models/paymentsModels/payment';

//Metodo Listar
export const getPayment = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await payment.findAll({
            attributes: ['id', 'payment_fee', 'payment_amount', 'date_payments'],
            include: [
                {
                    model: student,
                    attributes: ['name','lastname'],
                    where: { id: sequelize.col('student.id') },
                    include:[{
                        model:degree,
                        attributes:['name'],
                        where:{id: sequelize.col('student.id_degree')}
                    }]
                }]
        });

        // Devolvemos la respuesta en formato JSON
        res.json(list);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getPaymentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await payment.findByPk(id);

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

export const newPayment = async (req: Request, res: Response) => {
    const { id_student, payment_fee, payment_amount, date_payments } = req.body;

    try {
        payment.create({
            id_student,
            payment_fee,
            payment_amount,
            date_payments
        });
        res.json({
            msg: `Cuota ingresada`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la Cuota",
            error
        });
    }

};

export const deletePayment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await payment.findOne({ where: { id: id } });

    try {
        if (one) {
            await payment.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `La Cuota ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updatePayment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  id_student, payment_fee, payment_amount, date_payments } = req.body;

    const one = await payment.findOne({ where: { id: id } });

    try {
        if (one) {
            await student.update({ id_student, payment_fee, payment_amount,date_payments }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro de Cuota`,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar la informacion`,
            error
        });
    }
};