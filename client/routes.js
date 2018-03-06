import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import LoginForm from "./modules/Session/components/LoginForm";
import SignupForm from "./modules/Session/components/SignupForm";
import MixableShow from "./modules/Mixable/components/MixableShowContainer";
// // import NotFoundPage from './pages/NotFoundPage';
//
export default [
  {
    component: App,
    routes: [
      {
        path: "/login",
        exact: true,
        component: LoginForm
      },
      {
        path: "/signup",
        exact: true,
        component: SignupForm
      },
      {
        path: "/mixables/:id",
        exact: true,
        component: MixableShow
      }
    ]
  }
];
// export default (
//     <Route path="/" component={TemporaryIndex} />
// );
