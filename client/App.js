import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginForm from './modules/Session/components/LoginForm';
import SignupForm from './modules/Session/components/SignupForm';

const App = () => (
  <main>
    Test string #1.
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
    </Switch>
  </main>
);

export default App;
