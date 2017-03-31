/* eslint-env mocha */
import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Editor } from './Editor'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory
    let meteorCall
    let [ note2 ] = notes
    beforeEach(function () {
      meteorCall = expect.createSpy()
      browserHistory = {
        push: expect.createSpy()
      }
    })

    it('Should render pick note message', function () {
      const wrapper = mount(<Editor meteorCall={meteorCall} browserHistory={browserHistory} />)
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started')
    })
    it('Should render note not found', function () {
      const wrapper = mount(<Editor selectedNoteId='test' meteorCall={meteorCall} browserHistory={browserHistory} />)
      expect(wrapper.find('p').text()).toBe('Note not found')
    })
    it('Should render title and body of currently selected note', function () {
      const wrapper = mount(<Editor note={note2} meteorCall={meteorCall} browserHistory={browserHistory} />)
      expect(wrapper.find('input').node.value).toBe(note2.title)
      expect(wrapper.find('textarea').node.value).toBe(note2.body)
    })
    it('Should update note title', function () {
      const wrapper = mount(<Editor note={note2} selectedNoteId={note2._id} meteorCall={meteorCall} browserHistory={browserHistory} />)
      wrapper.find('input').simulate('change', {target: {value: 'My new value'}})
      expect(meteorCall).toHaveBeenCalledWith('notes.update', note2._id, {title: 'My new value'})
    })
    it('Should update note body', function () {
      const wrapper = mount(<Editor note={note2} selectedNoteId={note2._id} meteorCall={meteorCall} browserHistory={browserHistory} />)
      wrapper.find('textarea').simulate('change', {target: {value: 'My new value'}})
      expect(meteorCall).toHaveBeenCalledWith('notes.update', note2._id, {body: 'My new value'})
    })
    it('Should remove a note', function () {
      const wrapper = mount(<Editor note={note2} selectedNoteId={note2._id} meteorCall={meteorCall} browserHistory={browserHistory} />)
      wrapper.find('button').simulate('click')
      expect(meteorCall).toHaveBeenCalledWith('notes.remove', note2._id)
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard')
    })
  })
}
