import expect from 'expect'
import { Meteor } from 'meteor/meteor'

import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('Validate User', function () {
    it('Should return true', function () {
      expect(validateNewUser({ emails: [ { address: 'adamjhartleb@gmail.com' } ] })).toBe(true)
    })
    it('Should reject invalid email', function () {
      const testUser = {
        emails: [
          { address: 'adamjhartleb' }
        ]
      }
      expect(() => {
        validateNewUser(testUser)
      }).toThrow()
    })
  })
}

