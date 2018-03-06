import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import LoginForm from './modules/Session/components/LoginForm';
import SignupForm from './modules/Session/components/SignupForm';
// // import NotFoundPage from './pages/NotFoundPage';
//
export default [
  { component: App,
    routes: [
      { path: '/login',
        exact: true,
        component: LoginForm
      },
      { path: '/signup',
        exact: true,
        component: SignupForm,
      },
    ]
  }
];
// export default (
//     <Route path="/" component={TemporaryIndex} />
// );
