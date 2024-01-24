import { Router } from "express";
import { deleteLevel, getLevelById, getLevels, newLevel, updateLevel } from "../controllers/level";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getLevels);
router.get('/:id', getLevelById);
router.post('/', newLevel);
router.put('/:id', updateLevel);
router.delete('/:id', deleteLevel);

export default router;  