import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { listAllUsers, getUserById, updateUser, deleteUser, assignDoctorToAppointment, listUserAppointments, listDoctors} from "../controllers/admin.controller.js";

const router = Router();

router.get('/api/users', authRequired, listAllUsers);
router.get('/api/users/:id', authRequired, getUserById);
router.put('/api/users/:id', authRequired, updateUser);
router.delete('/api/users/:id', authRequired, deleteUser);

router.put('/api/doctor/assign/:id', authRequired, assignDoctorToAppointment);
router.get('/appointments/user/:userId', authRequired, listUserAppointments);
router.get('/doctors', authRequired, listDoctors);

export default router;