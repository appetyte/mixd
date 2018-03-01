import passport from 'passport';
import mongoose from 'mongoose';
// import promisify from 'es6-promisify';
// import mail from '../handlers/mail';
import passportConfig from '../handlers/passport';

const User = mongoose.model('User');
export const login = passport.authenticate('local', {
  failureRedirect: '/login',
  // failureFlash: 'Invalid login.', // TODO do we need flash?
  successRedirect: '/',
  // successFlash: 'You are now logged in.',
});

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  // req.flash('error', 'Please log in to the site first.');
  res.json({ error: 'Please log in to the site first.' });
  // res.redirect('/login');
};

// TODO:
// forgot pw (md5 token, reset email)
// update your pw (reset email)
// google Oauth strategy
