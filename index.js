require('dotenv').config({ path: './application.env' })
require('ignore-styles');

if (process.env.NODE_ENV === 'production') {
  // TODO
} else {
  require('babel-register');
  require("babel-polyfill");
  require('./server/server');
}
