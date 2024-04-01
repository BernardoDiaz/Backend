import { Router } from 'express';
import { getIncidents,getIncidentById,newIncident,updateIncident,deleteIncident, getById } from '../../controllers/StudentControllers/incidentsstudent';
import validateToken from '../UserRoute/validate-token';

const router = Router();

router.get('/', validateToken,getIncidents);
router.get('/:id',validateToken,getIncidentById);
router.get('/ed/:id',validateToken,getById);
router.post('/', validateToken,newIncident);
router.put('/:id', validateToken,updateIncident);
router.delete('/:id', validateToken,deleteIncident);

 
export default router;  