import { Router } from "express";
import { newTicket, viewTicket } from "../../controllers/ReportsController/generatePDF";
import validateToken from "../UserRoute/validate-token";

const router = Router();
router.get('/:id',validateToken,viewTicket);
router.post('/', validateToken,newTicket);


export default router;  