import { Router } from "express";
import { deleteSeccion, getSeccionById, getSeccions, newSeccion, updateSeccion } from "../controllers/seccion";
import validateToken from "./UserRoute/validate-token";


const router = Router();

router.get('/', validateToken,getSeccions);
router.get('/:id', validateToken,getSeccionById);
router.post('/', validateToken,newSeccion);
router.put('/:id', validateToken,updateSeccion);
router.delete('/:id', validateToken,deleteSeccion);
 
export default router;