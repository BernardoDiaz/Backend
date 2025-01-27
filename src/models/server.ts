import express from 'express';
import cors from "cors";
//RUTAS
import routesAspirant from '../routes/AspirantRoute/aspirant';
import routesConsult from '../routes/AspirantRoute/consultation';
import routesInterview from '../routes/AspirantRoute/interview';
import routesTeacher from '../routes/teacher';
import routesStudent from '../routes/StudentRoute/student';
import routesStudentData from '../routes/StudentRoute/studentdata';
import routesIncident from '../routes/StudentRoute/incidentsstudent';;
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
import routesAssigment from '../routes/intermediateRoute/teacherDegree';
import routesQualification from '../routes/qualifications';
import routesStatistics from '../routes/chartsRoute/stadistics';
import routesDashboard from '../routes/chartsRoute/stadisticsDashboard';
import routesSendEmail from '../routes/SendEmailRoutes/SendEmail';
import routesFeesAspi from '../routes/AspirantRoute/feeAspirant';
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
import { payment } from './pago'; 
import { otherPayment } from './otrosPagos';  
import { generatePDF } from './ReportsModel/generatePDF';
import { other_generatePDF } from './ReportsModel/othergeneratePDF';
import { teacher } from './teacher';
import { DegreeAssignment } from './intermediateModels/teacherDegree';
import { qualifications } from './qualifications';
import { incidentsstudent } from './studentsModels/incidentsstudent';
import { paymentAspirant } from './paymentsModels/pagosAspirante';
import { admissionFees } from './arancelesIngreso';

class Server {
    private app: express.Application;
    private port: number;
    private host:string; 

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10) || 8080;
        this.host = '0.0.0.0';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    };

    listen() {
        this.app.listen(this.port,this.host, () => {
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

        this.app.use('/api/assig', routesAssigment);
        this.app.use('/api/qualification', routesQualification);
        this.app.use('/api/details', routesStatistics);
        this.app.use('/api/feesAsp', routesFeesAspi);
        this.app.use('/api/dash/',routesDashboard);
        this.app.use('/api/SendEmails/',routesSendEmail);

    };

    midlewares() {
        //parceo body
        this.app.use(express.json());
        this.app.use(express.json({ limit: '100mb' })); // Cambia '10mb' según tus necesidades
        this.app.use(express.urlencoded({ limit: '100mb', extended: true })); // También aplica para datos codificados en URL

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
            await interview.sync();
            await consultation.sync();
            //Fin Modulo 01 BD 
            
            await teacher.sync();
            await DegreeAssignment.sync();
            await subject.sync();
            await student.sync();
            await registration.sync();
            await studentdata.sync();
            await incidentsstudent.sync();
            await qualifications.sync(); 
            
            await payment.sync();
            await otherPayment.sync();
            await category.sync();
            await admissionFees.sync();
            await product.sync();
            await detailsPayment.sync();
            await planPayment.sync(); 
            await paymentAspirant.sync();
            await generatePDF.sync();
            await other_generatePDF.sync();
            await user.sync();
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;