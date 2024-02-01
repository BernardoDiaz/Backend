import { Router } from "express";
import {searchPlanPayment, searchRegistration, searchStudents } from "../../controllers/searchController/searchs";
import validateToken from "../UserRoute/validate-token";


const router = Router();

router.get('/', validateToken,searchStudents);
router.get('/registration', validateToken,searchRegistration);
router.get('/:id_student',validateToken,searchPlanPayment);

export default router;  