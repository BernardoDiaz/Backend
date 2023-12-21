import { Router } from 'express';
import { deletePayment, getPayment, getPaymentById, newPayment, updatePayment } from '../../controllers/paymentsControllers/payment';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getPayment);
router.get('/:id', getPaymentById);
router.post('/', newPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);


export default router;  