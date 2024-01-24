import { Router } from "express";
import { deleteSeccion, getSeccionById, getSeccions, newSeccion, updateSeccion } from "../controllers/seccion";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getSeccions);
router.get('/:id', getSeccionById);
router.post('/', newSeccion);
router.put('/:id', updateSeccion);
router.delete('/:id', deleteSeccion);
 
export default router;