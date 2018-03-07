import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Header from './modules/Header/components/Header';
import LoginForm from 'Session/components/LoginForm';
import SignupForm from 'Session/components/SignupForm';
import MixableIndex from 'Mixable/components/MixableIndexContainer';

export default [
  { component: App,
    routes: [
      {
        path: '/',
        component: Header,
      },
      { path: '/login',
        exact: true,
        component: LoginForm
      },
      { path: '/signup',
        exact: true,
        component: SignupForm,
      },
      {
        path: '/mixables',
        exact: true,
        component: MixableIndex
      }
    ]
  }
];
