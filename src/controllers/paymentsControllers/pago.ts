import { Request, Response } from 'express';
import * as shortid from 'shortid';
import { payment } from '../../models/paymentsModels/pago';
import { detailsPayment } from '../../models/paymentsModels/detallePago';
import { planPayment } from '../../models/paymentsModels/planPagos';
import { format } from 'date-fns';

//Metodo Listar
export const getPayment = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await payment.findAll({
            attributes: ['id', 'id_student', 'totalAmount', 'year', 'datePayment'],
            include: [{
                model: detailsPayment,
                attributes: ['id_payment', 'id_product']
            }, {
                model: planPayment,
                attributes: ['nameFee', 'state']
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
    const { id_student, totalAmount, year, detalle, cuotas } = req.body;
    const datePayment:  string = format(new Date(), 'yyyy-MM-dd');
    try {
        // Verificar si el arreglo del detalle está vacío
        if (detalle.length > 0 && cuotas.length > 0) {
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
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));
                await detailsPayment.bulkCreate(detalle);
            }, 2000); // delay of 2 seconds

            setTimeout(async () => {
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: idGenerete,
                    datePayment,
                    state: true
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await planPayment.update({
                        id_payment: id_payment,
                        datePayment,
                        state: state
                    }, {
                        where: {
                            id: id
                        }
                    });
                }

                res.json({
                    msg: `Pago Registrado con éxito`
                });


            }, 2000);

        } else if (detalle.length > 0) {
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
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));

                await detailsPayment.bulkCreate(detalle);


                res.json({
                    msg: `Pago Registrado con exito`
                });
            }, 5000); // delay of 5 seconds

        } else if (cuotas.length > 0) {
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
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: idGenerete,
                    state: cuotas.state
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await planPayment.update({
                        id_payment: id_payment,
                        state: state
                    }, {
                        where: {
                            id: id
                        }
                    });
                }

                res.json({
                    msg: `Pago Registrado con éxito`
                });


            }, 2000);
        } else {
            res.json({ msg: `No hay productos seleccionados` });
        }
    } catch (error) {
        res.json({
            msg: `Error al registrar una compra`,
            error
        })
    }
};