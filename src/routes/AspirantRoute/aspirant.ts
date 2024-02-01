import { Router } from 'express';
import { deleteAspirant, getAspirantById, getAspirants, newAspirant, updateAspirant } from '../../controllers/AspirantControllers/aspirant';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getAspirants);
router.get('/:id', validateToken,getAspirantById);
router.post('/', validateToken,newAspirant);
router.put('/:id', validateToken,updateAspirant);
router.delete('/:id', validateToken,deleteAspirant);

 
export default router;  