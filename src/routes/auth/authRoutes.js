import express from 'express';
import { loginUser, registerUser } from '../../controllers/auth/authController.js';
const router = express.Router();
import passport from 'passport';
import passportSetup from '../../controllers/auth/googleAuthController.js'

router.post('/signup', registerUser);
router.post('/login',loginUser);

router.get('/google/signup', passport.authenticate('google', {
    scope: ['profile']
}));
router.get(process.env.REDIRECT_URI, passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    // res.redirect('/profile');
});



export default router;