import { Router } from 'express';
import { deleteRegistration, getAlumnosOffRegistration, getRegistration, getRegistrationById, newRegistration, updateRegistration, updateRegistrationActive } from '../../controllers/paymentsControllers/registration';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getRegistration);
router.get('/offRegistration', getAlumnosOffRegistration);
router.get('/:id', getRegistrationById);
router.post('/', newRegistration);
router.put('/:id', updateRegistration);
router.put('/on/:id', updateRegistrationActive);
router.delete('/:id', deleteRegistration);


export default router;  