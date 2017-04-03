import React, { PropTypes } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const PrivateHeader = ({ title, handleLogout, isNavOpen }) => {
  const navImgSrc = isNavOpen ? '/images/x.svg' : '/images/bars.svg'
  return (
    <div className='header'>
      <div className='header__content'>
        <img className='header__nav-toggle' onClick={() => Session.set('isNavOpen', !isNavOpen)} src={navImgSrc} />
        <h1 className='header__title'>{title}</h1>
        <button className='button button--link-text' onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader)
