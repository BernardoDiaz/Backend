import { Router } from "express";
import { getDegreeByLevel, getDegrees, newDegree, updateDegree } from "../controllers/degree";
//import validateToken from "./validate-token";
const router = Router();

router.get('/', getDegrees);
router.get('/:idLevel', getDegreeByLevel);
router.post('/', newDegree);


export default router; 