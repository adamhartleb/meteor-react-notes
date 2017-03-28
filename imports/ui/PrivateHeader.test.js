import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { PrivateHeader } from './PrivateHeader'

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('Should set button text to logout', function () {
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={() => {}} />)
      expect(wrapper.find('button').text()).toBe('Logout')
    })
    it('Should use the title prop', function () {
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={() => {}} />)
      expect(wrapper.find('h1').text()).toBe('Test Title')
    })
    it('Should call handleLogout on click', function () {
      const spy = expect.createSpy()
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={spy} />)

      wrapper.find('button').simulate('click')

      expect(spy).toHaveBeenCalled()
    })
  })
}
