import express from 'express';
import cors from "cors";
//RUTAS
import routesAspirant from '../routes/aspirant';
import routesUsers from '../routes/user';
import routesDegree from '../routes/degree';
import routesLevel from '../routes/level';
import routesSeccion from '../routes/seccion';
//MODELOS DE BD
import { aspirant } from './aspirant';
import { user } from './user';
import { seccion } from './seccion';
import { degree } from './degree';
import { level } from './level';
import { consultation } from './consultation';
import { interview } from './interview';


class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('port ' + this.port);
        });
    };

    routes() {
        //endpoint aspirantes
        this.app.use('/api/aspirant', routesAspirant);
        //endpoint usuarios
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/users/login', routesUsers);
        //endpoint grados
        this.app.use('/api/degree', routesDegree);
        //endpoint niveles
        this.app.use('/api/level', routesLevel);
        //endpoint secciones
        this.app.use('/api/seccion', routesSeccion);

    };

    midlewares() {
        //parceo body
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    };

    async dbConnect() {
        try {
            //Modulo 01 BD
            await level.sync();
            await seccion.sync();
            await degree.sync();
            await aspirant.sync();
            await consultation.sync();
            await interview.sync();
            //Fin Modulo 01 BD
            await user.sync();
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;