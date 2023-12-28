import { Router } from "express";
import { getPayment, newPayment } from "../../controllers/paymentsControllers/pago";
//import validateToken from "./validate-token";

const router = Router();

router.get('/get', getPayment);
router.post('/add', newPayment);
router.put('/:id', );
router.delete('/:id', );


export default router; 