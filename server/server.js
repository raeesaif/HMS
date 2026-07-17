import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import AuthRouter from './routes/authRoute.js';
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin:
        "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
}))
app.use('/api/auth', AuthRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
