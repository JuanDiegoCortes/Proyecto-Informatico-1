import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import appointmentsRoutes from './routes/appointment.routes.js';
import queryRoutes from'./routes/queries.routes.js';
import doctorRoutes from './routes/doctor.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', queryRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(appointmentsRoutes);
app.use('/api', doctorRoutes);

export default app;
