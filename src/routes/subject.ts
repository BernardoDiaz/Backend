import { Router } from "express";
import { deleteSubject, getSubjects, newSubject, updateSubject } from "../controllers/subject";
import { getSeccionById } from "../controllers/seccion";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getSubjects);
router.get('/:id', getSeccionById);
router.post('/', newSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

export default router; 