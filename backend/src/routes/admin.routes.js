import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { listAllUsers, getUserById, updateUser, deleteUser } from "../controllers/admin.controller.js";

const router = Router();

router.get('/api/users', authRequired, listAllUsers);
router.get('/api/users/:id', authRequired, getUserById);
router.put('/api/users/:id', authRequired, updateUser);
router.delete('/api/users/:id', authRequired, deleteUser);


export default router;