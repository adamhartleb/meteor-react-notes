import React, { PropTypes } from 'react'
import moment from 'moment'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = ({ updatedAt, title, _id, Session, selected }) => {
  const className = selected ? 'item item--selected' : 'item'
  return (
    <div className={className} onClick={() => Session.set('selectedNoteId', _id)}>
      <h5 className='item__title'>{title || 'Untitled'}</h5>
      <p className='item__subtitle'>{moment(updatedAt).format('M/DD/YY')}</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object,
  Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return {
    Session
  }
}, NoteListItem)
