import { Router } from "express";
import { deleteTD, getTD, getTeachers, newTD, subjectByDegree } from "../../controllers/intermediateControllers/teacherDegree";
import validateToken from "../UserRoute/validate-token";

const router = Router();

router.get('/teacher', validateToken,getTeachers);
router.get('/subject/:idTeacher', validateToken,subjectByDegree);
router.get('/', validateToken,getTD);
router.post('/', validateToken,newTD);
router.delete('/dt/:id',validateToken,deleteTD);


export default router; 