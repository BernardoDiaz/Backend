import { Router } from "express";
import { deleteProduct, getProduct, newProduct, updateProduct } from "../../controllers/paymentsControllers/productos";
import validateToken from "../UserRoute/validate-token";
//import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken,getProduct);
router.post('/', validateToken,newProduct);
router.put('/:id', validateToken,updateProduct);
router.delete('/:id', validateToken,deleteProduct);

export default router;  