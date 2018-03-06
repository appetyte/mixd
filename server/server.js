import Express from 'express';
import ExpressValidator from 'express-validator';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';

import App from '../client/App';
import configureStore from '../client/store';
import serverConfig from './config';
import routes from '../client/routes';
import userRoutes from './routes/user.routes';
import mixableRoutes from './routes/mixable.routes';

const isDevMode = Boolean(process.env.NODE_ENV === 'development');
const isProdMode = Boolean(process.env.NODE_ENV === 'production');

mongoose.Promise = global.Promise;

mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure MongoDB is installed first.');
    throw error;
  }
});

const app = new Express();

// https://github.com/expressjs/session#compatible-session-stores
const MongoStore = connectMongo(session);

app.use(ExpressValidator());
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);
app.use('/api', mixableRoutes);

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>mixd</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = isProdMode
    ? (`
      :<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>
    `)
    : '';
  return renderFullPage(`Server Error ${errTrace}`, {});
};

app.get('*', (req, res, next) => {
  const store = configureStore();
  const promises = routes.reduce((accumulator, route) => {
    if (
      matchPath(req.url, route) &&
      route.component &&
      route.component.initialAction
    ) {
      accumulator.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }

    return accumulator;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialState = store.getState();
      res.send(renderFullPage(content, initialState));
    })
    .catch(next);
});

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`mixd is currently running on port ${serverConfig.port}`);
  }
});

export default app;
