import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import appointmentsRoutes from './routes/appointment.routes.js';
import doctorRoutes from './routes/doctor.routes.js'; // Importa el archivo de rutas para doctores
import diagnosticRoutes from './routes/diagnostic.routes.js'; // Importa el archivo de rutas para diagnóstico

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Configuración de rutas con prefijo '/api'
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/diagnostic', diagnosticRoutes); // Registra las rutas de diagnóstico
app.use('/api/doctors', doctorRoutes); // Registra las rutas de doctores

export default app;
