import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Meteor } from 'meteor/meteor'

import { NoteList } from './NoteList'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  describe('NoteList', function () {
    it('Should render a NoteListItem for each note', function () {
      const wrapper = mount(<NoteList notes={notes} />)
      expect(wrapper.find('NoteListItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })
    it('Should render NoteListEmptyItem if there are zero notes', function () {
      const wrapper = mount(<NoteList notes={[]} />)
      expect(wrapper.find('NoteListItem').length).toBe(0)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
    })
  })
}
