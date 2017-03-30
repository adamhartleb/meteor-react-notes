import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'

export class Editor extends Component {
  handleTitle (e) {
    const { selectedNoteId, meteorCall } = this.props
    meteorCall('notes.update',
      selectedNoteId,
      { title: e.target.value }
    )
  }
  handleBody (e) {
    const { selectedNoteId, meteorCall } = this.props
    meteorCall('notes.update',
      selectedNoteId,
      { body: e.target.value }
    )
  }
  render () {
    const { note, selectedNoteId } = this.props
    if (note) {
      return (
        <div>
          <input
            value={note.title}
            placeholder='Your title here'
            onChange={this.handleTitle.bind(this)} />
          <textarea
            value={note.body}
            placeholder='Your note here'
            onChange={this.handleBody.bind(this)} />
          <button>Delete Note</button>
        </div>
      )
    } else if (selectedNoteId) {
      return <p>Note not found</p>
    } else {
      return <p>Pick or create a note to get started</p>
    }
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call
  }
}, Editor)
