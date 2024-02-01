import { Router } from 'express';
import { getStudents,getStudentById,newStudent,updateStudent,deleteStudent, newRegistration } from '../../controllers/StudentControllers/student';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getStudents);
router.get('/:id', validateToken,getStudentById);
router.post('/', validateToken,newStudent);
router.post('/newR', validateToken,newRegistration);
router.put('/:id', validateToken,updateStudent);
router.delete('/:id', validateToken,deleteStudent);

 
export default router;