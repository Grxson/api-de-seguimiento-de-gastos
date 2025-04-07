import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import expenseRoutes from './routes/expense.routes.js';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Servidor corriendo en el puero ${PORT}`)))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));

