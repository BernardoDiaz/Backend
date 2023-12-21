import { Request, Response } from 'express';
import sequelize from '../../db/connection';
import { other_payment } from '../../models/paymentsModels/otherPayment';


//Metodo Listar
export const getOther_Payment = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await other_payment.findAll();

        // Devolvemos la respuesta en formato JSON
        res.json(list);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getOther_PaymentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await other_payment.findByPk(id);

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

export const newOther_Payment = async (req: Request, res: Response) => {
    const { name_fee,date_payments,payment_amount } = req.body;

    try {
        other_payment.create({
            name_fee,
            date_payments,
            payment_amount
        });
        res.json({
            msg: `Pago ingresada`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar la Pago",
            error
        });
    }

};

export const deleteOther_Payment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await other_payment.findOne({ where: { id: id } });

    try {
        if (one) {
            await other_payment.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El Pago ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateOther_Payment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  name_fee,date_payments,payment_amount } = req.body;

    const one = await other_payment.findOne({ where: { id: id } });

    try {
        if (one) {
            await other_payment.update({ name_fee,date_payments,payment_amount }, { where: { id: id } });
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