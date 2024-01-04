import { Router } from "express";
import {searchStudents } from "../../controllers/searchController/searchs";

//import validateToken from "./validate-token";

const router = Router();

router.get('/', searchStudents);

export default router; 