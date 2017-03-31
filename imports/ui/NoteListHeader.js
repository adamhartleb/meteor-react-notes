import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const NoteListHeader = ({ meteorCall }) => {
  const setNote = () => {
    meteorCall('notes.insert', (err, res) => {
      if (res) Session.set('selectedNoteId', res)
    })
  }
  return (
    <button onClick={setNote}>Add Note</button>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader)

