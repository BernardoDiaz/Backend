import { Router } from 'express';
import { getStudents,getStudentById,newStudent,updateStudent,deleteStudent, newRegistration } from '../../controllers/StudentControllers/student';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', newStudent);
router.post('/newR', newRegistration);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

 
export default router;