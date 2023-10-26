import { Router } from "express";
import { deleteDegree, getDegreeById, getDegrees, newDegree, updateDegree } from "../controllers/degree";
//import validateToken from "./validate-token";
const router = Router();

router.get('/', getDegrees);
router.get('/:id', getDegreeById);
router.post('/', newDegree);
router.put('/:id', updateDegree);
router.delete('/:id', deleteDegree);

export default router;