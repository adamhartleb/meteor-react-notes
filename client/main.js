import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'

import { routes, onAuthChange } from '../imports/routes/routes'
import '../imports/startup/simple-schema-configuration.js'

Tracker.autorun(() => {
  let privacy = Session.get('pagePrivacy')
  let isAuthenticated = Meteor.userId()
  onAuthChange(isAuthenticated, privacy)
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
    Session.set('isNavOpen', false)
  }
})

Tracker.autorun(() => {
  let isNavOpen = Session.get('isNavOpen')
  document.body.classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDOM.render(routes, document.getElementById('root'))
})
