import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createAppointment, getAppointments, assignDoctorToAppointment} from "../controllers/appointment.controller.js";


const router = Router();

router.post('/api/appointments', authRequired, createAppointment);
router.get('/api/appointments', authRequired, getAppointments);
router.put('/api/appointments/:appointmentId/assign-doctor', authRequired, assignDoctorToAppointment);


export default router;
