import { Router } from 'express';
import { getRatingTypes,getRatingTypeById,newRatingType,updateRatingType,deleteRatingType } from '../../controllers/StudentControllers/ratingtype';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getRatingTypes);
router.get('/:id', getRatingTypeById);
router.post('/', newRatingType);
router.put('/:id', updateRatingType);
router.delete('/:id', deleteRatingType);


export default router; 