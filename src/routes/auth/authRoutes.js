import express from 'express';
import passport from 'passport';
import googleAuth from 'passport-google-oauth20';
import { loginUser, registerUser } from '../../controllers/auth/authController.js';
import User from "../../models/auth/userModel.js";
import { encryptPassword } from '../../utils/passwordManager/passwordHandler.js';
import { googleLogin } from '../../controllers/auth/googleAuthController.js';

const router = express.Router();

const GoogleStrategy = googleAuth.Strategy;

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', {
    scope: ['profile','email'],
    
}));
router.get('/google/redirect/info', passport.authenticate('google', {
    session: false,
}), googleLogin);



export default router;
