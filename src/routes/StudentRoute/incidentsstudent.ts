import { Router } from 'express';
import { getIncidents,getIncidentById,newIncident,updateIncident,deleteIncident } from '../../controllers/StudentControllers/incidentsstudent';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getIncidents);
router.get('/:idStudent',getIncidentById);
router.post('/', validateToken,newIncident);
router.put('/:id', validateToken,updateIncident);
router.delete('/:id', validateToken,deleteIncident);

 
export default router;  