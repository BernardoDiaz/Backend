import { Router } from 'express';
import { deleteRegistration, getRegistration, getRegistrationById, newRegistration, updateRegistration } from '../../controllers/paymentsControllers/registration';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getRegistration);
router.get('/:id', getRegistrationById);
router.post('/', newRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);


export default router;  