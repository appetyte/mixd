import passport from 'passport';
import mongoose from 'mongoose';
import passportConfig from '../handlers/passport';

const User = mongoose.model('User');

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(422).send(err); }
    if (!user) { return res.status(422).json(info); }
    // if (err) { return res.json({ err, info }); }
    // if (!user) { return res.json({ errors: info.message }); }

    req.logIn(user, (err) => {
      if (err) { return res.status(422).send(err); }
      // if (err) { return res.json({ err, info }); }
      return res.json(user);
    });
  })(req, res, next);
};

// redirect the user to Google
// authorize
// redirect the user to the site at /api/auth/google/callback
export const googleLogin = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res, next);
};

// TODO

export const googleLoginCallback = (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
};

// export const googleLoginCallback = (req, res, next) => {
//   passport.authenticate('google', (err, user, info) => {
//     if (err) { return res.json({ err, info }); }
//     if (!user) { return res.json({ errors: info.message }); }
//     // res.json(user);
//     res.redirect('/');
//   })(req, res, next);
// };

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.json({ error: 'Please log in to the site first.' });
};