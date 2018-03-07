import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import LoginForm from "Session/components/LoginForm";
import SignupForm from "Session/components/SignupForm";
import MixableIndex from "Mixable/components/MixableIndexContainer";
// import MixableShow from "Mixable/components/MixableShowContainer";
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
        path: "/mixables",
        exact: true,
        component: MixableIndex
      }
    ]
  }
];
// export default (
//     <Route path="/" component={TemporaryIndex} />
// );
