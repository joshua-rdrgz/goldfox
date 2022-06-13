import React from 'react'

import OneMonthView from './OneMonthView'

function SixMonthView() {
  return (
    <section>
      <h4>At the end of...</h4>
      <div>
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