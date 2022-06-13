import React from 'react'

import OneMonthView from './OneMonthView'

function SixMonthView() {
  return (
    <section className='6-monthview'>
      <h4 className='6-monthview__section-title'>At the end of...</h4>
      <div className='6-monthview__container'>
        {/* We might want to map this later */}
        <OneMonthView />
        <OneMonthView />
        <OneMonthView />
        <OneMonthView />
        <OneMonthView />
        <OneMonthView />
      </div>
    </section>
  )
}

export default SixMonthView