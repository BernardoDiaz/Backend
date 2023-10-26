import { Router } from 'express';
import { getConsultations,getConsultationById,newConsultation,updateConsultation,deleteConsultation } from '../../controllers/AspirantControllers/consultation';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getConsultations);
router.get('/:id', getConsultationById);
router.post('/', newConsultation);
router.put('/:id', updateConsultation);
router.delete('/:id', deleteConsultation);


export default router;  