import { Router } from "express";
import { searchCategoryById, searchPaymentPlanByStudent, searchStudentById, searchStudents } from "../../controllers/searchController/searchs";

//import validateToken from "./validate-token";

const router = Router();

router.get('/', searchStudents);
router.get('/:id', searchStudentById);
router.get('/product/:idCategory', searchCategoryById);
router.get('/planpayment/:idStudent', searchPaymentPlanByStudent);

export default router; 