import passport from "passport";
import googleAuth  from 'passport-google-oauth20'
import User from "../../models/auth/userModel.js";

const GoogleStrategy = googleAuth.Strategy();


// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     userModel.findById(id).then((user) => {
//         done(null, user);
//     });
// });


passport.use({
     clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI
},
    async (accessToken, refreshToken, profile, done) => {
    console.log('called')
});