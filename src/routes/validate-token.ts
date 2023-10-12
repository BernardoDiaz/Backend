import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('valido');
    const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token si entra
        try {
            //corte de token firmado por nuestro servidor
            const bearerToken = headerToken.slice(7);

            Jwt.verify(bearerToken, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F');

            next();

        } catch (error) {
            res.status(401).json({
                msg: `Token no valido`
            })
        }

    } else {
        res.status(400).json({
            msg: `Acceso denegado`
        })
    }
};

export default validateToken;