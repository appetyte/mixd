import User from '../models/user';

export const validateNewUser = (req, res, next) => {
  req.sanitizeBody('displayName');
  req.checkBody('displayName', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'Invalid email address.').isEmail();
  req.sanitizeBody('email').normalizeEmail();
  req.checkBody('password', 'Password can\'t be blank.').notEmpty();
  req.checkBody('confirmPassword', 'Confirm password can\'t be blank.').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match!').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return res.json(errors);
  }

  next();
};

export const signup = async (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    displayName: req.body.displayName,
  });

  await User.register(newUser, req.body.password)
    .catch((errors) => {
      res.json({ errors });
    });

  next();
};
