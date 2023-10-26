import { Router } from 'express';
import { getRatings,getRatingById,newRating,updateRating,deleteRating } from '../../controllers/StudentControllers/ratingstudent';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getRatings);
router.get('/:id', getRatingById);
router.post('/', newRating);
router.put('/:id', updateRating);
router.delete('/:id', deleteRating);


export default router; 