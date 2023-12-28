import { Request, Response } from 'express';
import * as shortid from 'shortid';
import { payment } from '../../models/paymentsModels/pago';
import { detailsPayment } from '../../models/paymentsModels/detallePago';

//Metodo Listar
export const getPayment = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await payment.findAll();

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
                msg: `No existe`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newPayment = async (req: Request, res: Response) => {

    //constantes de pago
    const { id_student, totalAmount, year, datePayment } = req.body;

    try {
        //generamos el id de la compra
        const idGenerete = shortid.generate();
    
        payment.create({
            id: idGenerete,
            id_student,
            totalAmount,
            year,
            datePayment
        });
    
        setTimeout(async () => {
            const detalle =
                req.body.detalle.map((detalle: any) => ({
                    id_payment: idGenerete,
                    id_product: detalle.id_product
                }));
    
            await detailsPayment.bulkCreate(detalle);
    
            res.json({
                msg: `Pago Registrado`
            });
        }, 5000); // delay of 5 seconds
    }catch (error) {
        res.json({
            msg: `Error al registrar una compra`,
            error
        })
    }
};