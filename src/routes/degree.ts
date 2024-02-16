import { Router } from "express";
import { deleteDegree, getDegreeById, getDegreeByLevel, getDegrees, newDegree, updateDegree } from "../controllers/degree";
import validateToken from "./UserRoute/validate-token";

const router = Router();

router.get('/', validateToken,getDegrees);
router.get('/:id',validateToken,getDegreeById);
router.put('/:id',validateToken,updateDegree);
router.get('/lv/:id', validateToken,getDegreeByLevel);
router.post('/', validateToken,newDegree);
router.delete('/:id',validateToken,deleteDegree);


export default router; 