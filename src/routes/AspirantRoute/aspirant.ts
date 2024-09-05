import { Router } from 'express';
import { deleteAspirant, getAspirantById, getAspirants, newAspirant, newStudents_Asp, updateAspirant, viewCaseAspirant } from '../../controllers/AspirantControllers/aspirant';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getAspirants);
router.get('/viewCase', validateToken,viewCaseAspirant);
router.get('/:id', validateToken,getAspirantById);
router.post('/', validateToken,newAspirant);
router.post('/newStudent', validateToken,newStudents_Asp);
router.put('/:id', validateToken,updateAspirant);
router.delete('/:id', validateToken,deleteAspirant);

 
export default router;  