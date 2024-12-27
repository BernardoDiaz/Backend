import { Request, Response } from 'express';
import { aspirant } from '../../models/aspirantsModels/aspirant';
import sequelize from '../../db/connection';
import { degree } from '../../models/degree';
import shortid from 'shortid';
import { interview } from '../../models/aspirantsModels/interview';
import { consultation } from '../../models/aspirantsModels/consultation';
import { student } from '../../models/studentsModels/student';
import { registration } from '../../models/paymentsModels/matricula';
import { level } from '../../models/level';
import { planPayment } from '../../models/paymentsModels/planPagos';
import { admissionFees } from '../../models/arancelesIngreso';
import { paymentAspirant } from '../../models/paymentsModels/pagosAspirante';

//Metodo Listar
export const getAspirants = async (req: Request, res: Response) => {

    //Generamos la lista
    const listAspirants = await aspirant.findAll({
        include: {
            model: degree, attributes: ['name','priceFee'],
            where: { id: sequelize.col('degree.id') }
        }
    });

    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
}; 

export const getAspirantById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneaspirant = await aspirant.findByPk(id);

    //validacion de existencia
    try {
        if (oneaspirant) {
            res.json(oneaspirant);
        } else {
 
            return res.status(404).json({
                msg: `No existe un aspirante`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar el aspirante`
        });
    }


};

export const newAspirant = async (req: Request, res: Response) => {
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;
    const id = shortid.generate();
    try {
        aspirant.create({
            id: id,
            manager: manager,
            manager_phone: manager_phone,
            manager_email: manager_email,
            adress: adress,
            aspirant_fullname: aspirant_fullname,
            id_degree: id_degree
        });
        interview.create({
            id_aspirant: id
        });
        consultation.create({
            id_aspirant: id
        });
 
        // Obtención de los fees de la tabla "admissionFees"
        let actual = new Date().getFullYear();
        const FeesAdmin = await admissionFees.findAll({ where: { year: actual}});
        
        // Generación de plan de pago basado en "admissionFees"
        const planPaymentsAspirant = FeesAdmin.map((fee:any) => ({
            id_payment: null,
            id_aspirant: id,
            nameFee: fee.name,
            year: fee.year,
            dataPayment: null,
            price: fee.price,
            discount: 0,
            state: false

        })); 

        // Inserción de plan de pagos en la base de datos
        await paymentAspirant.bulkCreate(planPaymentsAspirant);

        res.json({
            msg: `El aspirante ${aspirant_fullname} fue inscrito en el proceso de seleccion`
        });

    } catch (error) {
        res.json({
            msg: "Ocurrio un error registrar un aspirante",
            error
        });
    }

};

export const deleteAspirant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneaspirant = await aspirant.findOne({ where: { id: id } });

    try {
        if (oneaspirant) {
            await aspirant.destroy({ where: { id: id } });
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `El aspirante ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar el aspirante`,
            error
        });
    }
};

export const updateAspirant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree } = req.body;

    const oneaspirant = await aspirant.findOne({ where: { id: id } });

    try {
        if (oneaspirant) {
            await aspirant.update({ manager, manager_phone, manager_email, adress, aspirant_fullname, id_degree }, { where: { id: id } });
            res.json({
                msg: `Informacion actualizada con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe un registro con el id: ${id} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar el aspirante`,
            error
        });
    }
};

export const viewCaseAspirant = async (req: Request, res: Response) => {
    //Generamos la lista
    const listAspirants = await aspirant.findAll({
        attributes: ['id', 'aspirant_fullname', 'is_visible'],
        include: [
            {
                model: consultation,
                attributes: ['state'],
                required: true // Esto asegura que se haga un INNER JOIN
            },
            {
                model: interview,
                attributes: ['state'],
                required: true // Esto asegura que se haga un INNER JOIN
            },
            {
                model: degree,
                attributes: ['id', 'name', 'priceFee'], include: [{ model: level, attributes: ['id', 'priceRegistration'] }],
                where: { id: sequelize.col('degree.id') }
            }
        ]
    });

    //Devolvemos la respuesta via JSON
    res.json(listAspirants);
}

export const newStudents_Asp = async (req: Request, res: Response) => {
    const students = req.body.students; // Suponiendo que envías un arreglo de estudiantes

    try { 
        for (const studentData of students) {
            const { id, name, lastname, id_degree, id_level, priceFee, priceRegistration } = studentData;
            const idGenerete = shortid.generate();
            const year = new Date().getFullYear();

            // Crear el registro de estudiante
            await student.create({
                id: idGenerete,
                name: name,
                lastname: lastname,
                year: year,
                state: true
            });

            // Ocultar el registro de aspirante 
            await aspirant.update(
                { is_visible: false }, // Campo para ocultar
                { where: { id: id } } // Condiciones para identificar al aspirante
            );

            // Generación de matrícula
            await registration.create({
                id_student: idGenerete,
                id_degree,
                id_level,
                year
            });

            // Generación de plan de pago
            const planPayments = [];

            for (let i = 1; i <= 11; i++) {
                const date = new Date(year, i - 1, 18);

                planPayments.push({
                    id_student: idGenerete,
                    id_payment: null,
                    id_level,
                    nameFee: 'Cuota ' + i + ' - ' + year,
                    year,
                    datePayment: null,
                    dateExpiration: date,
                    price: priceFee,
                    state: false,
                });
            }

            const studentInfo = {
                id_student: idGenerete,
                id_payment: null,
                id_level,
                nameFee: 'Matrícula - ' + year,
                year,
                datePayment: null,
                dateExpiration: new Date(year, 0, 18),
                price: priceRegistration,
                state: false,
            };

            planPayments.unshift(studentInfo);

            await planPayment.bulkCreate(planPayments);
        }

        res.json({
            msg: "Todos los alumnos fueron ingresados correctamente"
        });

    } catch (error) {
        console.error('Error al registrar los alumnos:', error);
        res.status(500).json({
            msg: "Ocurrió un error al registrar los alumnos",
            error: error
        });
    }
};


