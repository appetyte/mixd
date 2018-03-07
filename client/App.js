import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './base.scss';
import LoginForm from './modules/Session/components/LoginForm';
import SignupForm from './modules/Session/components/SignupForm';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
    </Switch>
  </main>
);

export default App;
