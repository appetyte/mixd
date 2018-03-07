import React from "react";
import { Route, Switch } from "react-router-dom";

import "./base.scss";
import LoginForm from "Session/components/LoginForm";
import SignupForm from "Session/components/SignupForm";
import MixableIndex from "Mixable/components/MixableIndexContainer";

const App = () => (
  <main>
    Test string #1.
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/mixables" component={MixableIndex} />
    </Switch>
  </main>
);

export default App;
