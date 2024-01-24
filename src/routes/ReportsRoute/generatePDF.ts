import { Router } from "express";
import { newTicket, viewTicket } from "../../controllers/ReportsController/generatePDF";

const router = Router();
router.get('/:id',viewTicket);
router.post('/', newTicket);


export default router;  