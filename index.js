// ignoring Sass styles when using babel
import register from 'ignore-styles';
register(['.scss'])

if (process.env.NODE_ENV === 'production') {
  // TODO
} else {
  require('./server/server');
}
