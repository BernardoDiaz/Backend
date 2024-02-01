import { Router } from "express";
import { getPayment, newPayment } from "../../controllers/paymentsControllers/pago";
import validateToken from "../UserRoute/validate-token";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken,getPayment);
router.post('/', validateToken,newPayment);


export default router;  