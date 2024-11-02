import { Router } from "express";
import express from 'express';
import { authRequired } from "../middlewares/validateToken.js";
import { createDoctor } from '../controllers/doctor.controller.js';

const router = express.Router();

// Ruta protegida para crear un perfil de doctor
router.post('/doctors', authRequired, createDoctor);

export default router;
