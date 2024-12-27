import { Request, Response } from 'express';
import { payment } from '../../models/pago';
import { detailsPayment } from '../../models/paymentsModels/detallePago';
import { planPayment } from '../../models/paymentsModels/planPagos';
import { student } from '../../models/studentsModels/student';
import { otherPayment } from '../../models/otrosPagos';
import sequelize from '../../db/connection';
import { paymentAspirant } from '../../models/paymentsModels/pagosAspirante';

//Metodo Listar
export const getPayment = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const list = await payment.findAll({
            attributes: ['id', 'totalAmount', 'year', 'datePayment'],
            include: [{
                model: student,
                attributes: ['name', 'lastname']
            }, {
                model: detailsPayment,
                attributes: ['id_payment', 'id_product']
            }, {
                model: planPayment,
                attributes: ['nameFee', 'state']
            }],
            order: [['datePayment', 'DESC']]
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
    const { id_payment, id_student, totalAmount, totalDiscount, year, detalle, cuotas } = req.body;
    const fechaActual = new Date();

    try {
        // Verificar si el arreglo del detalle está vacío 
        if (detalle.length > 0 && cuotas.length > 0) {
            payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });
            setTimeout(async () => {
                const detalle =
                    req.body.detalle.map((detalle: any) => ({
                        id_payment: id_payment,
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));
                await detailsPayment.bulkCreate(detalle);
            }, 1000); // delay of 2 seconds

            setTimeout(async () => {
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    discount: cuotas.discount,
                    state: true
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await planPayment.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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

            payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });

            setTimeout(async () => {
                const detalle =
                    req.body.detalle.map((detalle: any) => ({
                        id_payment: id_payment,
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));

                await detailsPayment.bulkCreate(detalle);


                res.json({
                    msg: `Pago Registrado con exito`
                });
            }, 1000); // delay of 1 seconds

        } else if (cuotas.length > 0) {

            payment.create({
                id: id_payment,
                id_student,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });

            setTimeout(async () => { 
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    state: true
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await planPayment.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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

export const newPaymentAsp = async (req: Request, res: Response) => {

    //constantes de pago
    const { id_payment, id_aspirant, totalAmount, totalDiscount, year, detalle, cuotas } = req.body;
    const fechaActual = new Date();

    try {
        // Verificar si el arreglo del detalle está vacío 
        if (detalle.length > 0 && cuotas.length > 0) {
            payment.create({
                id: id_payment,
                id_aspirant,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });
            setTimeout(async () => {
                const detalle =
                    req.body.detalle.map((detalle: any) => ({
                        id_payment: id_payment,
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));
                await detailsPayment.bulkCreate(detalle);
            }, 1000); // delay of 2 seconds

            setTimeout(async () => {
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    discount: cuotas.discount,
                    state: true
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await paymentAspirant.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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

            payment.create({
                id: id_payment,
                id_aspirant,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });

            setTimeout(async () => {
                const detalle =
                    req.body.detalle.map((detalle: any) => ({
                        id_payment: id_payment,
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        price: detalle.price
                    }));

                await detailsPayment.bulkCreate(detalle);


                res.json({
                    msg: `Pago Registrado con exito`
                });
            }, 1000); // delay of 1 seconds

        } else if (cuotas.length > 0) {

            payment.create({
                id: id_payment,
                id_aspirant,
                totalAmount,
                discount:totalDiscount,
                year,
                datePayment: fechaActual
            });

            setTimeout(async () => { 
                const cuotas = req.body.cuotas.map((cuotas: any) => ({
                    id: cuotas.id,
                    id_payment: id_payment,
                    datePayment: fechaActual,
                    state: true
                }));

                for (let i = 0; i < cuotas.length; i++) {
                    const { id, id_payment, state } = cuotas[i];
                    await paymentAspirant.update({
                        id_payment: id_payment,
                        datePayment: fechaActual,
                        discount: cuotas.discount,
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

export const otherPayments = async (req: Request, res: Response) => {
    const { id_payment, year, detalle } = req.body;
    const fechaActual = new Date();

    try {
        // Verificar si el arreglo del detalle está vacío 
        if (detalle.length > 0) {

            setTimeout(async () => {
                const detalle =
                    req.body.detalle.map((detalle: any) => ({
                        id_other_payment: id_payment,
                        id_product: detalle.id_product,
                        nameProduct: detalle.nameProduct,
                        unit_price: detalle.price,
                        discount: detalle.discount,
                        year,
                        datePayment: fechaActual
                    }));

                await otherPayment.bulkCreate(detalle);


                res.json({
                    msg: `Pago Registrado con exito`
                });
            }, 1000); // delay of 1 seconds
        } else {
            res.json({ msg: `No hay productos seleccionados` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `Error al registrar una compra`,
            error: error
        });
    }
};

export const getotherPayment = async (req: Request, res: Response) => {
    try {
        const list = await otherPayment.findAll({
            attributes: [
                'id_other_payment',
                [sequelize.fn('SUM', sequelize.col('unit_price')), 'total_unit_price'],
                'year',
                'datePayment'
            ],
            group: ['id_other_payment', 'year', 'datePayment'],
            order: [['datePayment', 'DESC']]
        });

        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
  