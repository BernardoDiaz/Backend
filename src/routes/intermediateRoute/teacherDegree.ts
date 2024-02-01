import { Router } from "express";
import { getTD, getTeachers, newTD } from "../../controllers/intermediateControllers/teacherDegree";
import validateToken from "../UserRoute/validate-token";

const router = Router();

router.get('/teacher', validateToken,getTeachers);
router.get('/', validateToken,getTD);
router.post('/', validateToken,newTD);


export default router; 