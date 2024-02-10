import express from 'express';
import passport from 'passport';

import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from './routes/auth/authRoutes.js'
import googleAuth from 'passport-google-oauth20';

const GoogleStrategy = googleAuth.Strategy;

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(cookieParser());
app.get('/home', (req, res) => {
// console.log(`${process.env.REDIRECT_URI}`)
    res.render('home');
})




app.use('/api/v1/auth', authRoutes);
app.use(passport.initialize());



export { app }