import { Router } from "express";
import { deleteDegree, getDegreeById, getDegreeByLevel, getDegrees, newDegree, updateDegree } from "../controllers/degree";
//import validateToken from "./validate-token";
const router = Router();

router.get('/', getDegrees);
router.get('/:id',getDegreeById);
router.put('/:id',updateDegree);
router.get('/:idLevel', getDegreeByLevel);
router.post('/', newDegree);
router.delete('/:id',deleteDegree);


export default router; 