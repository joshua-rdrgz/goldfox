import React from 'react'

import NumberWrapper from '../utilities/NumberWrapper'

function IncExpItem() {
  return (
    <div>
      {/* We'll want to map over this in actuality, what's here is the content that we'll map */}
      <h5>Item</h5>
      <p>Category</p>
      <NumberWrapper>$567</NumberWrapper>
    </div>
  )
}

export default IncExpItem