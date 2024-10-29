import { Router } from "express";
import { register, login, logout, profile, checkAuth} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/logout', logout);
router.get('/api/profile',authRequired,profile);
router.get('/api/checkAuth',authRequired,checkAuth);


export default router;