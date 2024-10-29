import { Router } from 'express';
import express from 'express';
import { uploadFile, getFile, deleteFile } from '../controllers/diagnostic.controller.js';
import { upload } from '../db.js';
import multer from 'multer';

const router = express.Router();

// Configuración de multer aquí o en el controlador
router.post('/upload', uploadFile);
router.get('/file/:id', getFile);
router.delete('/file/:id', deleteFile);
router.post('/upload', upload.single('file'), uploadFile);


export default router;
