import { Router } from "express";
import { newTicket, newTicket_other, viewTicket, viewTicket_other } from "../../controllers/ReportsController/generatePDF";
import validateToken from "../UserRoute/validate-token";

const router = Router();
router.get('/:id',validateToken,viewTicket);
router.post('/', validateToken,newTicket);
router.get('/other/:id',validateToken,viewTicket_other);
router.post('/other', validateToken,newTicket_other);


export default router;  