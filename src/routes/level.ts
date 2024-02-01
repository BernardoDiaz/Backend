import { Router } from "express";
import { deleteLevel, getDegree, getLevelById, getLevels, newLevel, updateLevel } from "../controllers/level";
import validateToken from "./UserRoute/validate-token";

const router = Router();

router.get('/', validateToken,getLevels);
router.get('/:id', validateToken,getLevelById);
router.post('/', validateToken,newLevel);
router.put('/:id', validateToken,updateLevel);
router.delete('/:id', validateToken,deleteLevel);
router.get('/degree/:idLevel',validateToken,getDegree)

export default router;  