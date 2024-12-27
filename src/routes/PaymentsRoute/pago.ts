import { Router } from "express";
import { getotherPayment, getPayment, newPayment, newPaymentAsp, otherPayments } from "../../controllers/paymentsControllers/pago";
import validateToken from "../UserRoute/validate-token";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken,getPayment);
router.post('/', validateToken,newPayment);
router.post('/payAsp', validateToken,newPaymentAsp);
router.post('/other', validateToken, otherPayments);
router.get('/v-other', validateToken, getotherPayment);


export default router;  