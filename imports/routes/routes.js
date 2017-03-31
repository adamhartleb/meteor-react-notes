import { Session } from 'meteor/session'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

export const onAuthChange = (isAuthenticated, privacy) => {
  if (privacy === 'no' && isAuthenticated) {
    browserHistory.replace('/dashboard')
  } else if (privacy === 'yes' && !isAuthenticated) {
    browserHistory.replace('/')
  }
}

export const globalOnChange = (prevPage, { routes }) => {
  globalOnEnter({ routes })
}
export const globalOnEnter = ({ routes }) => {
  Session.set('pagePrivacy', routes[routes.length - 1].privacy)
}

const onEnterNote = (nextPage) => {
  Session.set('selectedNoteId', nextPage.params.id)
}
const onLeaveNote = (nextPage) => {
  Session.set('selectedNoteId', undefined)
}

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path='/' component={Login} privacy='no' />
      <Route path='/signup' component={Signup} privacy='no' />
      <Route path='/dashboard' component={Dashboard} privacy='yes' />
      <Route path='/dashboard/:id' component={Dashboard} privacy='yes' onEnter={onEnterNote} onLeave={onLeaveNote} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)
