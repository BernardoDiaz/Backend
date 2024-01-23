import { Router } from "express";
import { getTD, getTeachers, newTD } from "../../controllers/intermediateControllers/teacherDegree";
//import validateToken from "./validate-token";
const router = Router();

router.get('/teacher', getTeachers);
router.get('/', getTD);
router.post('/', newTD);


export default router;