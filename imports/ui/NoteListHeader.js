import React, { PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListHeader = ({ meteorCall }) => {
  return (
    <button onClick={() => meteorCall('notes.insert')}>Add Note</button>
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


