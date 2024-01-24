import { Router } from 'express';
import { getStudentDatas,getStudentDataById,newStudentData,updateStudentData,deleteStudentData } from '../../controllers/StudentControllers/studentdata';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getStudentDatas);
router.get('/:id', getStudentDataById);
router.post('/', newStudentData);
router.put('/:id', updateStudentData);
router.delete('/:id', deleteStudentData);


export default router;  