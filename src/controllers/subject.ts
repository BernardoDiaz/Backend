import { Response,Request } from "express";
import { subject } from "../models/subject";

export const getSubjects = async (req:Request,res:Response) => {
    
    const list = await subject.findAll({attributes:['id','name']});

    res.json(list);
} 

export const getSubjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await subject.findByPk(id);
 
    //validacion de existencia
    try {
        if (one) {
            res.json(one);
        } else {

            return res.status(404).json({
                msg: `No existe`
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al buscar`
        });
    }


};

export const newSubject = async (req:Request, res:Response) => {
    
    const {name} = req.body;

    //Validar nombre unico de nivel
    const namevalid = await subject.findOne({where:{name:name}});

    if (namevalid) {
        return res.status(400).json({
            msg: `Ya existe una asignatura registrado como ${name}`
        });
    };

    //Guardando nivel en bd
    try {
        await subject.create({
            name: name
        });

        res.json({
            msg:`La asignatura ${name} creado exitosamente`
        });
        
    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear la asignatura",
            error
        });
    }
};

export const deleteSubject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const one = await subject.findOne({where:{id:id}});

    try {
        if (one) {
            await subject.destroy({where:{id:id}});
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

export const updateSubject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const one = await subject.findOne({ where: { id: id } });

    try {
        if (one) {
            await subject.update({ name }, { where: { id: id } });
            res.json({
                msg: `Actualizado con exito`
            });
        } else {
            return res.status(404).json({
                msg: `No existe ${name} `,
            });
        }
    } catch (error) {
        return res.status(404).json({
            msg: `Ocurrio un error al editar`,
            error
        });
    }
};