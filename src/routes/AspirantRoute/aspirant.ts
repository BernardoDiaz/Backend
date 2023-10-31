import { Router } from 'express';
import { deleteAspirant, getAspirantById, getAspirants, getAspirantsFilter, newAspirant, updateAspirant } from '../../controllers/AspirantControllers/aspirant';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getAspirants);
router.get('/fl', getAspirantsFilter);
router.get('/:id', getAspirantById);
router.post('/', newAspirant);
router.put('/:id', updateAspirant);
router.delete('/:id', deleteAspirant);


export default router;  