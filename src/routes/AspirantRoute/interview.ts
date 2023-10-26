import { Router } from 'express';
import { getInterviews,getInterviewById,newInterview,updateInterview,deleteInterview } from '../../controllers/AspirantControllers/interview';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getInterviews);
router.get('/:id', getInterviewById);
router.post('/', newInterview);
router.put('/:id', updateInterview);
router.delete('/:id', deleteInterview);


export default router;  