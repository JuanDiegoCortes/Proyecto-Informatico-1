import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createAppointment, getAppointments} from "../controllers/appointment.controller.js";

const router = Router();

router.post('/api/appointments', authRequired, createAppointment);
router.get('/api/appointments', authRequired, getAppointments);


export default router;
