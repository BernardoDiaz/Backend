import express from 'express';
import cors from "cors";
//RUTAS
import routesAspirant from '../routes/AspirantRoute/aspirant';
import routesConsult from '../routes/AspirantRoute/consultation';
import routesInterview from '../routes/AspirantRoute/interview';
import routesTeacher from '../routes/teacher';
import routesStudent from '../routes/StudentRoute/student';
import routesStudentData from '../routes/StudentRoute/studentdata';
import routesIncident from '../routes/StudentRoute/incidentsstudent';
import routesRating from '../routes/StudentRoute/ratingstudent';
import routesUsers from '../routes/UserRoute/user';
import routesDegree from '../routes/degree';
import routesLevel from '../routes/level';
import routesSeccion from '../routes/seccion';
import routesSubject from '../routes/subject';
import routesCategory from '../routes/PaymentsRoute/categorias';
import routesProduct from '../routes/PaymentsRoute/productos';
import routesPayment  from '../routes/PaymentsRoute/pago';
import routesSearch from '../routes/searchRoute/seatchs';
import routesPDF from '../routes/ReportsRoute/generatePDF';
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
import { studentdata } from './studentsModels/studentdata';
import { registration } from './paymentsModels/matricula';
import { category } from './paymentsModels/categorias';
import { detailsPayment } from './paymentsModels/detallePago';
import { planPayment } from './paymentsModels/planPagos';
import { product } from './paymentsModels/productos';
import { payment } from './paymentsModels/pago';  
import { generatePDF } from './ReportsModel/generatePDF';
import { teacher } from './teacher';
import { DegreeAssignment } from './intermediateModels/teacherDegree';


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

        this.app.use('/api/category', routesCategory);
        this.app.use('/api/product', routesProduct);
        //endpoint categorias y productos

        this.app.use('/api/payment', routesPayment);

        this.app.use('/api/search', routesSearch);
        this.app.use('/api/gpdf', routesPDF);
        this.app.use('/api/teacher',routesTeacher);


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
            
            await teacher.sync();
            await DegreeAssignment.sync();
            await subject.sync();
            await student.sync();
            await registration.sync();
            await studentdata.sync();
            //await ratingstudent.sync(); 
            
            await payment.sync();
            await category.sync();
            await product.sync();
            await detailsPayment.sync();
            await planPayment.sync(); 
            await generatePDF.sync();



            await user.sync();
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;