import { Router } from "express";
import {searchPlanPayment, searchPlanPayment_Asp, searchRegistration, searchStudents, searchStudents_Asp, searchStudents_Full } from "../../controllers/searchController/searchs";
import validateToken from "../UserRoute/validate-token";


const router = Router();

router.get('/', validateToken,searchStudents);
router.get('/full', validateToken,searchStudents_Full);
router.get('/aspirant', validateToken,searchStudents_Asp);
router.get('/registration', validateToken,searchRegistration);
router.get('/:id_student',validateToken,searchPlanPayment); 
router.get('/aspirant/fees/:id_aspirant',validateToken,searchPlanPayment_Asp); 

export default router;  