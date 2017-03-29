import React from 'react'

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'

export default ({ params }) => {
  return (
    <div>
      <PrivateHeader title='Dashboard' />
      <div className='page-content'>
        <NoteList />
      </div>
    </div>
  )
}
