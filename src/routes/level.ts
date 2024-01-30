import { Router } from "express";
import { deleteLevel, getDegree, getLevelById, getLevels, newLevel, updateLevel } from "../controllers/level";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getLevels);
router.get('/:id', getLevelById);
router.post('/', newLevel);
router.put('/:id', updateLevel);
router.delete('/:id', deleteLevel);
router.get('/degree/:idLevel',getDegree)

export default router;  