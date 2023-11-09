import { Router } from 'express';
import { getInterviews,getInterviewById,newInterview,updateInterview,deleteInterview, getAspirantsFilter, getInterviewsPendient } from '../../controllers/AspirantControllers/interview';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getInterviews);
router.get('/pendient', getInterviewsPendient);
router.get('/fl', getAspirantsFilter);
router.get('/:id', getInterviewById);
router.post('/', newInterview);
router.put('/:id', updateInterview);
router.delete('/:id', deleteInterview);


export default router;  