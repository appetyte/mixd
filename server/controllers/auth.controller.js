import passport from 'passport';
import crypto from 'crypto';
import mongoose from 'mongoose';
// import promisify from 'es6-promisify';
// import mail from '../handlers/mail';
import passportConfig from '../handlers/passport';

const User = mongoose.model('User');
export const login = passport.authenticate('local', {
  failureRedirect: '/login',
  // failureFlash: 'Invalid login.',
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

// export const forgot = async (req, res) => {
//   // 1. See if a user with that email exists
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     req.flash('error', 'No account with that email exists.');
//     return res.redirect('/login');
//   }
//   // 2. Set reset tokens and expiry on their account
//   user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
//   await user.save();
//   // 3. Send them an email with the token
//   const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
//   await mail.send({
//     user,
//     filename: 'password-reset',
//     subject: 'Password Reset',
//     resetURL
//   });
//   req.flash('success', `You have been emailed a password reset link.`);
//   // 4. redirect to login page
//   res.redirect('/login');
// };

// export const reset = async (req, res) => {
//   const user = await User.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: { $gt: Date.now() }
//   });
//   if (!user) {
//     req.flash('error', 'Password reset is invalid or has expired');
//     return res.redirect('/login');
//   }
//   // if there is a user, show the rest password form
//   res.render('reset', { title: 'Reset your Password' });
// };

// export const confirmedPasswords = (req, res, next) => {
//   if (req.body.password === req.body['password-confirm']) {
//     next(); // keepit going!
//     return;
//   }
//   req.flash('error', 'Passwords do not match!');
//   res.redirect('back');
// };
//
// export const update = async (req, res) => {
//   const user = await User.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: { $gt: Date.now() }
//   });
//
//   if (!user) {
//     req.flash('error', 'Password reset is invalid or has expired');
//     return res.redirect('/login');
//   }
//
//   const setPassword = promisify(user.setPassword, user);
//   await setPassword(req.body.password);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;
//   const updatedUser = await user.save();
//   await req.login(updatedUser);
//   req.flash('success', '💃 Nice! Your password has been reset! You are now logged in!');
//   res.redirect('/');
// };
