import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createAppointment, getAppointments, getDiagnosticByAppointment} from "../controllers/appointment.controller.js";

const router = Router();

router.post('/api/appointments', authRequired, createAppointment);
router.get('/api/appointments', authRequired, getAppointments);
router.get('/api/appointments/:appointmentId/diagnosis', authRequired, getDiagnosticByAppointment);

export default router;
