import { Router } from 'express';
import { deleteOther_Payment, getOther_Payment, getOther_PaymentById, newOther_Payment, updateOther_Payment } from '../../controllers/paymentsControllers/otherPayment';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getOther_Payment);
router.get('/:id', getOther_PaymentById);
router.post('/', newOther_Payment);
router.put('/:id', updateOther_Payment);
router.delete('/:id', deleteOther_Payment);


export default router;  