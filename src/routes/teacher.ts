import { Router } from "express";
import { getDegreeTeacher, getTeacher, newTeacher } from "../controllers/teacher";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getTeacher);
router.get('/ag/:id_levelSearch', getDegreeTeacher);
router.post('/',newTeacher);

export default router; 