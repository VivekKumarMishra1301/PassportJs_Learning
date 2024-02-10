import passport from 'passport';
import googleAuth from 'passport-google-oauth20';
import User from '../../models/auth/userModel.js';



const GoogleStrategy = googleAuth.Strategy;

passport.use(
    new GoogleStrategy({
        callbackURL: process.env.REDIRECT_URI,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
},
        async (accessToken, refreshToken, profile, done, ) => {
        console.log(profile)
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const profilePic = profile.photos.value;
        const password = profile.id;
            const checkUserExist = await User.findOne({ email: email });
            console.log(checkUserExist)
            return done(null,checkUserExist)
        if (checkUserExist) {
            // done(null, checkUserExist);
            // next();
            return ;
        } else {
            const hashedPassword = await encryptPassword(password);
            const user = await User.create({ name: name, username: email, password: hashedPassword, profilePic: profilePic });
            return done(null, user);
        }

    }));
