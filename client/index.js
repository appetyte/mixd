import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import store from './store';

document.addEventListener('DOMContentLoaded', () => {
  const RootWithStore = <Root store={store} />;
  const rootElement = document.getElementById('root');
  ReactDOM.render(RootWithStore, rootElement);
});
