import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'
import { createContainer } from 'meteor/react-meteor-data'

import NoteListHeader from './NoteListHeader'

export const NoteList = ({ notes }) => {
  return (
    <div>
      NoteList { notes.length }
      <NoteListHeader />
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch()
  }
}, NoteList)
