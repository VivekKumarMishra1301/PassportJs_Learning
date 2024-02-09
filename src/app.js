import express from 'express';

import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from './routes/auth/authRoutes.js'


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);




export { app }