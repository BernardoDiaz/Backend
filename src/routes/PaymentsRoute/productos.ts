import { Router } from "express";
import { deleteProduct, getProduct, newProduct, updateProduct } from "../../controllers/paymentsControllers/productos";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', getProduct);
router.post('/', newProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;  