import { Router } from "express";
import {searchPlanPayment, searchStudents } from "../../controllers/searchController/searchs";

//import validateToken from "./validate-token";

const router = Router();

router.get('/', searchStudents);
router.get('/:id_student',searchPlanPayment);

export default router;  