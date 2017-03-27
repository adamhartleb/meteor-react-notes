import expect from 'expect'
import { Meteor } from 'meteor/meteor'

import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testId',
      title: 'testTitle',
      body: 'testbody',
      updatedAt: 0,
      userId: 'testUserId'
    }
    const noteTwo = {
      _id: 'testId2',
      title: 'Blergghhh',
      body: 'Boooop',
      updatedAt: 0,
      userId: 'testUserId2'
    }
    beforeEach(function () {
      Notes.remove({})
      Notes.insert(noteOne)
    })

    it('Insert should insert a new note', function () {
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: 'test' })
      expect(Notes.findOne({ _id, userId: 'test' })).toExist()
    })
    it('Insert should throw an error if the user is not authorized', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert'].apply({ userId: null })
      }).toThrow()
    })
    it('Remove should remove a note', function () {
      Meteor.server.method_handlers['notes.remove'].call({ userId: noteOne.userId }, noteOne._id)
      expect(Notes.findOne({ _id: noteOne._id })).toNotExist()
    })
    it('Remove should not remove a note if user is unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].call({ userId: null }, noteOne._id)
      }).toThrow()
    })
    it('Remove should not remove a note if the note ID is invalid', function () {
      const invalid = Meteor.server.method_handlers['notes.remove'].call({ userId: noteOne.userId }, 'invalid')
      expect(invalid).toNotExist()
    })
    it('Update should update note', function () {
      const title = 'This is the updated title'
      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title }])
      const note = Notes.findOne({ _id: noteOne._id })

      expect(note.updatedAt).toBeGreaterThan(0)
      expect(note).toInclude({
        title,
        body: noteOne.body
      })
    })
    it('Update should throw error if extra properties are sent to update', function () {
      const extraProp = 'This should fail'
          , title = 'This is the updated title'
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title, extraProp }])
      }).toThrow()
    })
    it('Update should not update note if the current user is not the creator of the note', function () {
      const title = 'This is the updated title'
      Meteor.server.method_handlers['notes.update'].apply({ userId: 'SomeoneElse' }, [noteOne._id, { title }])
      const note = Notes.findOne({ _id: noteOne._id })

      expect(note).toInclude(noteOne)
    })
    it('Update should throw an error if the user is not authorized', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: null }, [noteOne._id, { title: 'test' }])
      }).toThrow()
    })
    it('Update should not update a note if the note ID is invalid', function () {
      const title = 'This is the updated title'
      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }
        , ['jibbbberish', { title }])
      const note = Notes.findOne({ _id: noteOne._id })

      expect(note).toInclude(noteOne)
    })
    it('Publish should return the user\'s notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId }).fetch()
      expect(res.length).toBe(1)
      expect(res[0]).toInclude(noteOne)
    })
    it('Publish should return zero notes if the user has no notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteTwo.userId }).fetch()
      expect(res.length).toBe(0)
    })
  })
}