import { Request, Response } from 'express';
import { student } from '../../models/studentsModels/student';
import { registration } from '../../models/paymentsModels/matricula';
import { degree } from '../../models/degree';
import { seccion } from '../../models/seccion';
import { planPayment } from '../../models/paymentsModels/planPagos';
import { aspirant } from '../../models/aspirantsModels/aspirant';
import { paymentAspirant } from '../../models/paymentsModels/pagosAspirante';
 
export const searchStudents = async (req: Request, res: Response) => {
    const actualYear = new Date().getFullYear();
    try {
      const list = await student.findAll({
        attributes: ['id', 'name', 'lastname','email', 'state'],
        where: {
          state: 'Activo'
        },
        include: [{
          model: registration,
          attributes: ['id_degree', 'id_level', 'year'],
          where: { year: actualYear },
          include: [{
            model: degree,
            attributes: ['name'],
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

export const searchStudents_Full = async (req: Request, res: Response) => {
  const actualYear = new Date().getFullYear();
  try {
    const list = await student.findAll({
      attributes: ['id', 'name', 'lastname','email', 'state'],
      include: [{
        model: registration,
        attributes: ['id_degree', 'id_level', 'year'],
        where: { year: actualYear },
        include: [{
          model: degree,
          attributes: ['name'],
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

export const searchStudents_Asp = async (req: Request, res: Response) => {
  try {
    const list = await aspirant.findAll({
      attributes: ['id', 'aspirant_fullname', 'manager_email'],
        include: [{
          model: degree,
          attributes: ['name'],
          include: [{
            model: seccion,
            attributes: ['name']
          }]
        }]
    });
    res.json(list);
    
  } catch (error) {
      // Manejamos cualquier error aquí
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const searchRegistration = async (req: Request, res: Response) => {
  const actualYear = new Date().getFullYear();
  try {
      const list = await student.findAll({
          attributes: ['id', 'name', 'lastname'],
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

export const searchPlanPayment_Asp = async (req: Request, res: Response) => {
  const { id_aspirant } = req.params;
  try {
    const one = await paymentAspirant.findAll({where:{id_aspirant:id_aspirant, state: false},
    attributes:['id','nameFee','price']});
    res.json(one);
  } catch (error) {
    // Manejamos cualquier error aquí
    res.status(500).json({ error: 'Error para traer el plan de pagos' });
  }
};