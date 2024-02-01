import { Router } from 'express';
import { getInterviews,getInterviewById,newInterview,updateInterview,deleteInterview, getAspirantsFilter, getInterviewsPendient } from '../../controllers/AspirantControllers/interview';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getInterviews);
router.get('/pendient', validateToken,getInterviewsPendient);
router.get('/fl', validateToken,getAspirantsFilter);
router.get('/:id', validateToken,getInterviewById);
router.post('/', validateToken,newInterview);
router.put('/:id', validateToken,updateInterview);
router.delete('/:id', validateToken,deleteInterview);
 

export default router;  