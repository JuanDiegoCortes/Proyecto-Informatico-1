import { Router } from 'express';
import { uploadDiagnosticVideo } from '../controllers/doctor.controller.js';
import multer from 'multer';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/upload/:appointmentId', authRequired, upload.single('video'), uploadDiagnosticVideo);

export default router;
