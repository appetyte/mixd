import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  try {
    const serializedUser = User.serializeUser()(user, done);
    return serializedUser;
  } catch (error) {
    done(null, user.id);
  }
});

passport.deserializeUser((id, done) => {
  try {
    const deserializedUser = User.deserializeUser()(id, done)
    return deserializedUser;
  } catch (error) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  }
});

passport.use(
  User.createStrategy()
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      done(null, user);
    },
  ),
);
