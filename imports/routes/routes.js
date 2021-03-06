import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import { createBrowserHistory } from 'history';
import { v4 as uuidv4 } from 'uuid';

import Anonymous from './../ui/Anonymous'
import SignupPage from './../ui/SignupPage'
import LoginPage from './../ui/LoginPage'
import Dashboard from '../ui/Dashboard'
import NotFound from './../ui/NotFound'
import ForgotPassword from './../ui/ForgotPassword'

export const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', 'login', '/signup', '/forgot_password']
const authenticatedPages = ['/dashboard']

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
      return <Redirect to="/dashboard" />
  } else {
      return <Component />
  }
}

const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
      return <Redirect to="/" />
  } else {
      return <Component />
  }
}

export const onAuthChange = (isAuthenticated) => {
  if(!isAuthenticated){
    if (!localStorage.getItem('tnylnkAnonId')) {
      localStorage.setItem('tnylnkAnonId', uuidv4())
    }
  }

  const pathname = location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/')
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Anonymous)} />
      <Route path="/login" render={() => onEnterPublicPage(LoginPage)} />
      <Route path="/signup" render={() => onEnterPublicPage(SignupPage)} />
      <Route path="/forgot_password" render={() => onEnterPublicPage(ForgotPassword)} />
      <Route path="/dashboard" render={() => onEnterPrivatePage(Dashboard)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)