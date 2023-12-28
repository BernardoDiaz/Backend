import { Response,Request } from "express";
import sequelize from "../../db/connection";
import { product } from "../../models/paymentsModels/productos";
import { category } from "../../models/paymentsModels/categorias";


export const getProduct = async (req:Request,res:Response) => {
    try {
        const list = await product.findAll({attributes:['id','nameProduct','price'],include:{
            model:category,
            attributes:['id','nameCategory'],
            where:{id: sequelize.col('category.id')}
        }});
            res.json(list);
        
    } catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
};

export const newProduct = async (req:Request,res:Response) => {
    
    const {nameProduct,price,id_category} = req.body;
    try {
        await product.create({
            nameProduct,
            price,
            id_category
        });
        res.json({
            msg:` ${nameProduct} creado exitosamente`
        });
    } catch (error) {
        res.json({
            msg:'No se puede insertar el producto',
            error
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneLevel = await product.findOne({where:{id:id}});

    try {
        if (oneLevel) {
            await product.destroy({where:{id:id}});
            res.json({
                msg: `Eliminado con exito`
            });
        } else {
            res.status(404).json({
                msg: `Ya no existe`
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: `Ocurrio un error al eliminar`,
            error
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nameProduct,price,id_category } = req.body;

    const oneLevel = await category.findOne({ where: { id: id } });

    try {
        if (oneLevel) {
            await category.update({ nameProduct,price,id_category }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe: ${nameProduct} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};