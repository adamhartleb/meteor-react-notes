import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'
import { createContainer } from 'meteor/react-meteor-data'

import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = ({ notes }) => {
  const renderNotes = () => {
    return notes.map(note => {
      return <NoteListItem {...note} />
    })
  }
  return (
    <div>
      <NoteListHeader />
      {notes.length === 0 ? <NoteListEmptyItem /> : renderNotes()}
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
