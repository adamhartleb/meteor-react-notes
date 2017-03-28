import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Notes = new Mongo.Collection('notes')

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId })
  })
}

Meteor.methods({
  'notes.insert' (title = '', body = '') {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: new Date().getTime()
    })
  },
  'notes.remove' (_id) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })

    return Notes.remove({ _id, userId: this.userId })
  },
  'notes.update' (_id, updates) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    })

    Notes.update({_id, userId: this.userId}, {
      $set: {
        updatedAt: new Date().getTime(),
        ...updates
      }
    })
  }
})
