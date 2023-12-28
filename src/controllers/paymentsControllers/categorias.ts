import { Response,Request } from "express";
import sequelize from "../../db/connection";
import { category } from "../../models/paymentsModels/categorias";


export const getCategory = async (req:Request,res:Response) => {
    try {
        const list = await category.findAll({attributes:['id','nameCategory']});
            res.json(list);
        
    } catch (error) {
        res.json({
            msg: "Ocurrio un error al traer la informacion",
            error
        });
    }
};

export const newCategory = async (req:Request,res:Response) => {
    
    const {nameCategory} = req.body;

        const namevalid = await category
        .findOne({where:{nameCategory:nameCategory}});

        if (namevalid) {
            return res.status(400).json({
                msg: `Ya existe ${nameCategory}`
            });
        };

    try {
        await category.create({
            nameCategory
        });
        res.json({
            msg:`La categoria ${nameCategory} creada exitosamente`
        });
    } catch (error) {
        res.json({
            msg:'No se puede insertar la categoria',
            error
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const oneLevel = await category.findOne({where:{id:id}});

    try {
        if (oneLevel) {
            await category.destroy({where:{id:id}});
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

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nameCategory } = req.body;

    const oneLevel = await category.findOne({ where: { id: id } });

    try {
        if (oneLevel) {
            await category.update({ nameCategory }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe: ${nameCategory} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};