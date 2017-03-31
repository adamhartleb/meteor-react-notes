import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/notes'

export class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
    this.handleTitle = this.handleTitle.bind(this)
    this.handleBody = this.handleBody.bind(this)
  }
  handleTitle (e) {
    const { selectedNoteId, meteorCall } = this.props
    let title = e.target.value
    this.setState({ title })
    meteorCall('notes.update', selectedNoteId, { title })
  }
  handleBody (e) {
    const { selectedNoteId, meteorCall } = this.props
    let body = e.target.value
    this.setState({ body })
    meteorCall('notes.update', selectedNoteId, { body })
  }
  handleDelete (id, call) {
    call('notes.remove', id)
    this.props.browserHistory.push('/dashboard')
  }
  componentDidUpdate (prevProps, prevState) {
    const { note } = this.props
    const currNote = note ? note._id : undefined
    const prevNote = prevProps.note ? prevProps.note._id : undefined

    if (currNote && currNote !== prevNote) {
      this.setState({
        title: note.title,
        body: note.body
      })
    }
  }
  render () {
    const { note, selectedNoteId, meteorCall } = this.props
    if (note) {
      return (
        <div className='editor-content'>
          <input
            value={this.state.title}
            placeholder='Your title here'
            onChange={this.handleTitle} />
          <textarea
            value={this.state.body}
            placeholder='Your note here'
            onChange={this.handleBody} />
          <button onClick={() => this.handleDelete(selectedNoteId, meteorCall)}>Delete Note</button>
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
  note: PropTypes.object,
  meteorCall: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    meteorCall: Meteor.call,
    browserHistory
  }
}, Editor)
