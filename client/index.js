import React from 'react';
import { hydrate } from 'react-dom';
import Root from './Root';
import configureStore from './store';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore(window.__PRELOADED_STATE__);
  const RootWithStore = <Root store={store} />;
  const rootElement = document.getElementById('root');

  hydrate(RootWithStore, rootElement);
  delete window.__PRELOADED_STATE__;
});
