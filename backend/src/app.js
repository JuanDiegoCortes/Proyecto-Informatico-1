import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import appointmentsRoutes from './routes/appointment.routes.js';
import diagnosticRoutes from './routes/diagnostic.routes.js'; // Importa el archivo de rutas para diagnóstico

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Usa las rutas
app.use(authRoutes);
app.use(adminRoutes);
app.use(appointmentsRoutes);
app.use('/diagnostic', diagnosticRoutes); // Registra las rutas de diagnóstico

export default app;
