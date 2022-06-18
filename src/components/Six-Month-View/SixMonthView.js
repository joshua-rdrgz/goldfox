import React from 'react'

import classes from '../../styles/layout/Six-Month-View/SixMonthView.module.scss';

import OneMonthView from './OneMonthView'

function SixMonthView() {
  return (
    <section className={classes.networth}>
      <h4 className={classes.networth__title}>At the end of...</h4>
      <div className={classes.networth__monthContainer}>
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