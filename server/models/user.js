import mongoose from 'mongoose';
import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address!'],
    required: 'Please supply an email address!',
  },
  displayName: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply a username!',
  },
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

// helper method to wrap User's `register` method in an ES6 Promise
// https://github.com/saintedlama/passport-local-mongoose/issues/218
userSchema.statics.registerAsync = (data, password) => (
  new Promise((resolve, reject) => {
    this.register(data, password, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  })
);

export default mongoose.model('User', userSchema);
