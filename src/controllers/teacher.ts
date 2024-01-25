import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { level } from "../models/level";
import { teacher } from "../models/teacher";
import { degree } from "../models/degree";
import { seccion } from "../models/seccion";
import { DegreeAssignment } from "../models/intermediateModels/teacherDegree";
import { Model, Op } from "sequelize";

//Metodo Listar
export const getTeacher = async (req: Request, res: Response) => {

    //Generamos la lista
    const list = await teacher.findAll({
        attributes: ['id', 'name', 'lastname', 'id_level'],
    });

    //Devolvemos la respuesta via JSON
    res.json(list);
};
   
  interface IDegreeAssignment {
    id_degree: number;
    // Agrega aquí cualquier otro campo que necesites
  }
  
  export const getDegreeTeacher = async (req: Request, res: Response) => {
  
      const idDegrees = await DegreeAssignment.findAll({attributes:['id_degree']});
  
      // Extraemos solo los valores de id_degree
      const idDegreeValues = idDegrees.map((degreeAssignment: Model) => {
          const degreeAssignmentValue: IDegreeAssignment = degreeAssignment.get({ plain: true });
          return degreeAssignmentValue.id_degree;
      });
  
      const { id_levelSearch } = req.params;
      //Generamos la lista
      const list = await level.findAll({
          attributes: ['id'],
          where: { id: id_levelSearch },
          include: [{
              model: degree,
              attributes: ['id', 'name'],
              include: [{
                  model: seccion,
                  attributes: ['name']
              }],
              where: {
                  id: {
                      [Op.notIn]: idDegreeValues // Usamos notIn en lugar de ne
                  }
              }
          }]
      });
  
      //Devolvemos la respuesta via JSON
      res.json(list);
  };
    
export const newTeacher = async (req: Request, res: Response) => {

    const { name, lastname, password, id_level } = req.body;

    const hastPassword = await bcrypt.hash(password,10);
    try {
        await teacher.create({
            name: name,
            lastname: lastname,
            password:hastPassword,
            id_level: id_level
        });
        res.json({
            msg: `El Maestro ${name} fue creado exitosamente`
        });

    } catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error, al crear",
            error
        });
    }
}; 
