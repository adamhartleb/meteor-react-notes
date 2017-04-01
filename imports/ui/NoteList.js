import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = ({ notes }) => {
  return (
    <div className='item-list'>
      <NoteListHeader />
      {notes.length === 0
        ? <NoteListEmptyItem />
        : notes.sort((a, b) => b.updatedAt - a.updatedAt).map(note => {
          return <NoteListItem key={note._id} {...note} />
        })
      }
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch().map(note => {
      return {
        selected: selectedNoteId === note._id,
        ...note
      }
    })
  }
}, NoteList)
