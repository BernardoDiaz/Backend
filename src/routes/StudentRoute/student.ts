import { Router } from 'express';
import { getStudents,getStudentById,newStudent,updateStudent,deleteStudent, newRegistration, getStudentByDegree } from '../../controllers/StudentControllers/student';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getStudents);
router.get('/:id', validateToken,getStudentById);
router.get('/sbd/:IdDegree',validateToken,getStudentByDegree);
router.post('/', validateToken,newStudent);
router.post('/newR', validateToken,newRegistration);
router.put('/:id', validateToken,updateStudent);
router.delete('/:id', validateToken,deleteStudent);

 
export default router;