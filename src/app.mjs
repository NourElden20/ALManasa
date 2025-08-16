import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.mjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ربط المسارات
app.use('/auth', authRoutes);

export default app;
