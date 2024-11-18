import { Router } from "express";
import {searchPlanPayment, searchRegistration, searchStudents, searchStudents_Full } from "../../controllers/searchController/searchs";
import validateToken from "../UserRoute/validate-token";


const router = Router();

router.get('/', validateToken,searchStudents);
router.get('/full', validateToken,searchStudents_Full);
router.get('/registration', validateToken,searchRegistration);
router.get('/:id_student',validateToken,searchPlanPayment); 

export default router;  