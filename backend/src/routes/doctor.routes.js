import { Router } from 'express';
import { uploadDiagnosticVideo } from '../controllers/doctor.controller.js';
import multer from 'multer';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantiene el nombre original del archivo
    },
});

const upload = multer({ storage });

// Ruta para subir el video de ecografía
router.post('/upload/:appointmentId', authRequired, upload.single('video'), uploadDiagnosticVideo);

export default router;