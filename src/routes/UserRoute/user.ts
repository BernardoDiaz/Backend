import {Router} from 'express';
import { deleteUser, getUserById, getUsers, loginTeacher, loginUser,newUser, updateUser } from '../../controllers/UserControllers/user';
 
const router = Router();

router.post('/', newUser);
router.post('/login',loginUser);
router.post('/loginT',loginTeacher);
router.get('/',getUsers);
router.get('/:username',getUserById);
router.put('/:id',updateUser);
router.delete('/:id', deleteUser);

export default router; 