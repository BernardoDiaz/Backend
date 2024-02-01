import {Router} from 'express';
import { deleteUser, getUserById, getUsers, loginUser,newUser, updateUser } from '../../controllers/UserControllers/user';
 
const router = Router();

router.post('/', newUser);
router.post('/login',loginUser);
router.get('/',getUsers);
router.get('/:username',getUserById);
router.put('/:id',updateUser);
router.delete('/:id', deleteUser);

export default router; 