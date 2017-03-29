import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Meteor } from 'meteor/meteor'

import { NoteList } from './NoteList'

const notes = [
  {
    _id: 'testId1',
    title: 'testTitle1',
    body: '',
    updatedAt: 0,
    userId: 'testUserId1'
  },
  {
    _id: 'testId2',
    title: 'testTitle2',
    body: 'testBody',
    updatedAt: 0,
    userId: 'testUserId2'
  }
]

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