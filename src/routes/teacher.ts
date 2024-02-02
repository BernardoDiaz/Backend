import { Router } from "express";
import { deleteTeacher, getDegreeTeacher, getTeacher, newTeacher, stateTeacher } from "../controllers/teacher";
import validateToken from "./UserRoute/validate-token";

const router = Router();

router.get('/', validateToken,getTeacher);
router.get('/state/:id', validateToken,stateTeacher);
router.get('/ag/:id_levelSearch', validateToken,getDegreeTeacher);
router.post('/',validateToken,newTeacher);
router.delete('/:id',validateToken,deleteTeacher);

export default router;  