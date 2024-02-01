import { Router } from 'express';
import { getConsultations,getConsultationById,newConsultation,updateConsultation,deleteConsultation, getAspirantsFilter, getConsultationsPendient } from '../../controllers/AspirantControllers/consultation';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getConsultations);
router.get('/pendient', validateToken,getConsultationsPendient);
router.get('/fl', validateToken,getAspirantsFilter);
router.get('/:id', validateToken,getConsultationById);
router.post('/', validateToken,newConsultation);
router.put('/:id', validateToken,updateConsultation);
router.delete('/:id', validateToken,deleteConsultation);

 
export default router;  