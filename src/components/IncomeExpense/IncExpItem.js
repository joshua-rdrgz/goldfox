import React from 'react'

import NumberWrapper from '../utilities/NumberWrapper'

function IncExpItem(props) {
  return (
    <div className={`${props.type}__container`}>
      {/* We'll want to map over this in actuality, what's here is the content that we'll map */}
      <div className={`${props.type}__item`}>
        <h5 className={`${props.type}__title`}>Item</h5>
        <p className={`${props.type}__category`}>Category</p>
        <NumberWrapper className={`${props.type}__amount`}>$567</NumberWrapper>
      </div>
    </div>
  )
}

export default IncExpItem