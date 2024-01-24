import { Router } from "express";
import { deleteCategory, getCategory, newCategory, updateCategory } from "../../controllers/paymentsControllers/categorias";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getCategory);
router.post('/', newCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;  