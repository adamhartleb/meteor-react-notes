import React, { PropTypes } from 'react'
import moment from 'moment'

const NoteListItem = ({ updatedAt, title }) => {
  return (
    <div>
      <h5>{title || 'Untitled'}</h5>
      <p>{moment(updatedAt).format('M/DD/YY')}</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
}

export default NoteListItem
