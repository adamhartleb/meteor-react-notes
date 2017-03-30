/* eslint-env mocha */
import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'

import { NoteListItem } from './NoteListItem'
import { notes } from '../fixtures/fixtures'

const [ note1, note2 ] = notes

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      }
    })

    it('Should display untitled if no title is provided', function () {
      const wrapper = mount(<NoteListItem {...note1} Session={Session} />)
      expect(wrapper.find('h5').text()).toBe('Untitled')
    })
    it('Should display a formatted M/DD/YY date', function () {
      const wrapper = mount(<NoteListItem {...note2} Session={Session} />)
      expect(wrapper.find('p').text()).toMatch(/\d{1,2}\/\d{2}\/\d{2}/)
    })
    it('Should call set on click', function () {
      const wrapper = mount(<NoteListItem {...note2} Session={Session} />)
      wrapper.find('div').simulate('click')
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', note2._id)
    })
  })
}
