import React from 'react'

import classes from '../../styles/layout/Header/StartOver.module.scss';

function StartOver() {
  return (
    <>
      <button className={`${classes.btn} ${classes[`btn--start-over`]}`}>
        Start Over
      </button>
    </>
  )
}

export default StartOver