import passport from 'passport';
import mongoose from 'mongoose';
import passportConfig from '../handlers/passport';

const User = mongoose.model('User');
export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.json({ err, info }); }
    if (!user) { return res.json({ errors: info.message }); }

    req.logIn(user, (err) => {
      if (err) { return res.json({ err, info }); }
      return res.json(user);
    });
  })(req, res, next);
};


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
