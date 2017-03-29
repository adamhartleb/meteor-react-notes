import React, { PropTypes } from 'react'
import moment from 'moment'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = ({ updatedAt, title, _id, Session }) => {
  return (
    <div onClick={() => Session.set('selectedNoteId', _id)}>
      <h5>{title || 'Untitled'}</h5>
      <p>{moment(updatedAt).format('M/DD/YY')}</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return {
    Session
  }
}, NoteListItem)
