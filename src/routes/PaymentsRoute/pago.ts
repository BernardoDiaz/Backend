import { Router } from "express";
import { getPayment, newPayment } from "../../controllers/paymentsControllers/pago";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getPayment);
router.post('/', newPayment);


export default router; 