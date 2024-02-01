import { Router } from "express";
import { getDegreeTeacher, getTeacher, newTeacher } from "../controllers/teacher";
import validateToken from "./UserRoute/validate-token";

const router = Router();

router.get('/', validateToken,getTeacher);
router.get('/ag/:id_levelSearch', validateToken,getDegreeTeacher);
router.post('/',validateToken,newTeacher);

export default router;  