import React from "react";
import { Route, Switch } from "react-router-dom";

import "./base.scss";
import LoginForm from "./modules/Session/components/LoginForm";
import SignupForm from "./modules/Session/components/SignupForm";
import MixableShow from "./modules/Mixable/components/MixableShowContainer";

const App = () => (
  <main>
    Test string #1.
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/mixables/:id" component={MixableShow} />
    </Switch>
  </main>
);

export default App;
