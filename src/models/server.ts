import express from 'express';
import cors from "cors";
//RUTAS
import routesAspirant from '../routes/AspirantRoute/aspirant';
import routesConsult from '../routes/AspirantRoute/consultation';
import routesInterview from '../routes/AspirantRoute/interview';
import routesStudent from '../routes/StudentRoute/student';
import routesStudentData from '../routes/StudentRoute/studentdata';
import routesIncident from '../routes/StudentRoute/incidentsstudent';
import routesRating from '../routes/StudentRoute/ratingstudent';
import routesRatingType from '../routes/StudentRoute/ratingtype';
import routesUsers from '../routes/UserRoute/user';
import routesDegree from '../routes/degree';
import routesLevel from '../routes/level';
import routesSeccion from '../routes/seccion';
import routesSubject from '../routes/subject';
//MODELOS DE BD
import { aspirant } from './aspirantsModels/aspirant';
import { user } from './usersModels/user';
import { seccion } from './seccion';
import { degree } from './degree';
import { level } from './level';
import { consultation } from './aspirantsModels/consultation';
import { interview } from './aspirantsModels/interview';
import { subject } from './subject';
import { student } from './studentsModels/student';
import { ratingtype } from './studentsModels/ratingtype';
import { studentdata } from './studentsModels/studentdata';
import { ratingstudent } from './studentsModels/ratingstudent';


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
        this.app.use('/api/consultation', routesConsult);
        this.app.use('/api/interview',routesInterview);
        //endpoint estudiantes
        this.app.use('/api/student', routesStudent);
        this.app.use('/api/studentdata', routesStudentData);
        this.app.use('/api/rating',routesRating);
        this.app.use('/api/ratingtype',routesRatingType);
        this.app.use('/api/incident',routesIncident);
        //endpoint usuarios
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/users/login', routesUsers);
        //endpoint grados
        this.app.use('/api/degree', routesDegree);
        //endpoint niveles
        this.app.use('/api/level', routesLevel);
        //endpoint secciones
        this.app.use('/api/seccion', routesSeccion);
        //endpoint asignaturas
        this.app.use('/api/subject', routesSubject);

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

            await subject.sync();
            await student.sync();
            await ratingtype.sync();
            await studentdata.sync();
            await ratingstudent.sync();

            await user.sync();
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;