import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import { registration } from '../../models/paymentsModels/matricula';
import * as shortid from 'shortid';
import { planPayment } from '../../models/paymentsModels/planPagos';

//Metodo Listar
export const getStudents = async (req: Request, res: Response) => {
    try {
        // Generamos la lista de estudiantes
        const listaEstudiantes = await student.findAll({
            attributes: ['id', 'name', 'lastname', 'state']
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
    const { name, lastname, year, id_degree, id_level } = req.body;

    try {
        const idGenerete = shortid.generate();
        await student.create({
            id: idGenerete,
            name: name,
            lastname: lastname,
            year: year,
            state: true
        });
        //generacion de matricula
        await registration.create({
            id_student: idGenerete,
            id_degree,
            id_level,
            year
        });

        //generacion de plan de pago
        const { priceFee } = req.body;
        const planPayments = []; 

        for (let i = 1; i <= 11; i++) {
          const date = new Date(year, i - 1, 18);
        
          planPayments.push({
            id_student: idGenerete,
            id_payment: null,
            id_level,
            nameFee: 'Cuota ' + i +' - '+ year,
            year,
            datePayment: null,
            dateExpiration: date,
            price:priceFee,
            state: false,
          });
        }
        const { priceRegistration } = req.body;
        const studentInfo = {
          id_student: idGenerete,
          id_payment: null,
          id_level,
          nameFee: 'Matrícula - '+ year,
          year,
          datePayment: null,
          dateExpiration: new Date(year, 0, 18),
          price:priceRegistration,
          state: false,
        };
        
         await planPayments.unshift(studentInfo);
        
        await planPayment.bulkCreate(planPayments);
        
        res.json({
            msg: `El alumno ${name + ' ' + lastname} fue ingresado`
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