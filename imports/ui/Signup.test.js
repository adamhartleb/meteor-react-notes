import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { Signup } from './Signup'

if (Meteor.isClient) {
  describe('Signup', function () {
    it('Should show error messages', function () {
      const error = 'This is not working'
      const wrapper = mount(<Signup createUser={() => {}} />)

      wrapper.setState({ error })

      expect(wrapper.find('p').text()).toBe(error)
    })

    it('Should call createUser with the form data', function () {
      const email = 'bloop@gmail.com'
      const password = 'supersecret'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password

      wrapper.find('form').simulate('submit')
      expect(spy.calls[0].arguments[0]).toEqual({ email, password })
    })

    it('Should set error on short password', function () {
      const password = 'short'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      expect(wrapper.state('error').length).toBeGreaterThan(0)
    })

    it('Should set createUser callback errors', function () {
      const password = 'supersecret'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy} />)

      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[1]({})
      expect(wrapper.state('error')).toNotBe('')

      spy.calls[0].arguments[1]()
      expect(wrapper.state('error')).toBe('')
    })
  })
}