import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { user } from "../models/user";
import Jwt from "jsonwebtoken";

//Metodo para crear nuevo usuario
export const newUser = async (req: Request, res: Response) => {

    const { username, password, rol } = req.body;

    //Validacion de usuario
    const uservalid = await user.findOne({ where: { username: username } });

    if (uservalid) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    //Encriptacion de la password
    const hastpassword = await bcrypt.hash(password, 10);

    try {
        //Guardando usuario en base de datos
        await user.create({
            username: username,
            password: hastpassword,
            rol: rol
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente con el rol de ${rol}`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        })
    }

};


//Metodo de loggin para usuarios y generacion de token
export const loginUser = async (req: Request, res: Response) => {

    const { username, password, rol } = req.body;

    //validar si el usuario existe en bd
    const uservalidlog: any = await user.findOne({ where: { username: username } });

    //Si el user no existe
    if (!uservalidlog) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} registrado`
        })
    }

    //Validamos password
    const passwordvalid = await bcrypt.compare(password, uservalidlog.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: `Tu contraseña no es correcta, intenta nuevamente`
        })
    }
    //Si todo se cumplio vamos a la Generacion de token jwt 
    const token = Jwt.sign({
        username: username,
    }, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F');
    //Devolvemos el token como respuesta via JSON
    res.json(token);
};