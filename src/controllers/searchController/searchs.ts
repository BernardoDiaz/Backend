import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import { registration } from '../../models/paymentsModels/matricula';
import { degree } from '../../models/degree';
import { seccion } from '../../models/seccion';
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
            }]
          });
        res.json(list);
    } catch (error) {
        // Manejamos cualquier error aquí
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const searchPlanPayment = async (req: Request, res: Response) => {
  const { id_student } = req.params;
  try {
    const one = await planPayment.findAll({where:{id_student:id_student, state: false},
    attributes:['id','nameFee','price']});
    res.json(one);
  } catch (error) {
    // Manejamos cualquier error aquí
    res.status(500).json({ error: 'Error para traer el plan de pagos' });
  }
};