import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'

import NoteListItem from './NoteListItem'

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('Should display untitled if no title is provided', function () {
      const note = { title: '' }
      const wrapper = mount(<NoteListItem {...note} />)
      expect(wrapper.find('h5').text()).toBe('Untitled')
    })
    it('Should display a formatted M/DD/YY date', function () {
      const note = { title: '', updatedAt: new Date().getTime() }
      const wrapper = mount(<NoteListItem {...note} />)
      expect(wrapper.find('p').text()).toMatch(/\d{1,2}\/\d{2}\/\d{2}/)
    })
  })
}
