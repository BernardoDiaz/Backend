import { Request, Response } from 'express';
import sequelize from '../../db/connection';
import { student } from '../../models/studentsModels/student';
import { registration } from '../../models/paymentsModels/matricula';
import { degree } from '../../models/degree';
import { seccion } from '../../models/seccion';
import { product } from '../../models/paymentsModels/productos';
import { category } from '../../models/paymentsModels/categorias';
import { planPayment } from '../../models/paymentsModels/planPagos';

export const searchStudents = async (req: Request, res: Response) => {
    const actualYear = new Date().getFullYear();
    try {
        const list = await student.findAll({
            attributes: ['id', 'name', 'lastname'],
            include: [{
              model: registration,
              attributes: ['id_degree', 'id_level', 'year'],
              where:{year:actualYear},
              //incluir grado
              include: [{
                model: degree,
                attributes: ['name'],
          
                //incluir seccion
                include: [{
                  model: seccion,
                  attributes: ['name']
                }]
              }]
            }, {
              model: planPayment,
              attributes: ['nameFee','price'],
              where:{state:false}
              //incluir otra tabla
            }]
          });
        // const list = await student.findAll({
        //     attributes: ['id', 'name', 'lastname'],
        //     where: { state: 'Activo' },
        //     include: [{
        //         model: registration,
        //         attributes: [],
        //         where: { year: actualYear }
        //     }]
        // });
        res.json(list);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};