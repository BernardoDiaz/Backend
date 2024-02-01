import { Router } from "express";
import { deleteCategory, getCategory, newCategory, updateCategory } from "../../controllers/paymentsControllers/categorias";
import validateToken from "../UserRoute/validate-token";


const router = Router();

router.get('/', validateToken,getCategory);
router.post('/', validateToken,newCategory);
router.put('/:id', validateToken,updateCategory);
router.delete('/:id', validateToken,deleteCategory);

export default router;  