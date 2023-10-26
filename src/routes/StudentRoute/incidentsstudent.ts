import { Router } from 'express';
import { getIncidents,getIncidentById,newIncident,updateIncident,deleteIncident } from '../../controllers/StudentControllers/incidentsstudent';
//import validateToken from './validate-token';

const router = Router();

router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.post('/', newIncident);
router.put('/:id', updateIncident);
router.delete('/:id', deleteIncident);


export default router;  