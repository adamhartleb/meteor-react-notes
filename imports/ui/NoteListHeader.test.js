import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Meteor } from 'meteor/meteor'

import { NoteListHeader } from './NoteListHeader'

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('Should invoke the Meteor.call on click with one arg', function () {
      const spy = expect.createSpy()
      const wrapper = mount(<NoteListHeader meteorCall={spy} />)

      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalledWith('notes.insert')
    })
  })
}