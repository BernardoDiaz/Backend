import { Router } from 'express';
import { getStudentDatas,getStudentDataById,newStudentData,updateStudentData,deleteStudentData } from '../../controllers/StudentControllers/studentdata';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getStudentDatas);
router.get('/:id', validateToken,getStudentDataById);
router.post('/', validateToken,newStudentData);
router.put('/:id', validateToken,updateStudentData);
router.delete('/:id', validateToken,deleteStudentData);


export default router;  