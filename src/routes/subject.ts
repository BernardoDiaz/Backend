import { Router } from "express";
import { deleteSubject, getSubjects, newSubject, updateSubject } from "../controllers/subject";
import { getSeccionById } from "../controllers/seccion";
import validateToken from "./UserRoute/validate-token";

const router = Router();

router.get('/', validateToken,getSubjects);
router.get('/:id', validateToken,getSeccionById);
router.post('/', validateToken,newSubject);
router.put('/:id', validateToken,updateSubject);
router.delete('/:id', validateToken,deleteSubject);

export default router;  