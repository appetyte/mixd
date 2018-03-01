import Express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../client/App';

import serverConfig from './config';

// import userRoutes from './routes/user.routes';

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

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// app.use('/api', userRoutes);

const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>mixd</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
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

app.use((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(renderFullPage(html))
    res.end()
  }
});

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`mixd is currently running on port ${serverConfig.port}`);
  }
});

export default app;
