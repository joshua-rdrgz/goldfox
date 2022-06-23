import React from 'react'

import IncExpItem from './IncExpItem'
import AddIncExp from './AddIncExp';

import classes from '../../styles/layout/IncomeExpense/IncomeExpense.module.scss';

const capitalize = function (str) {
  return str[0].toUpperCase() + str.slice(1);
}

function IncomeExpense(props) {
  return (
    <section className={`${classes['inc-exp']}`}>
      <h4 className={`${classes['inc-exp__section-title']}`}>{capitalize(props.type)} per month...</h4>
      <div className={`${classes['inc-exp__content']}`}>
        <IncExpItem type={props.type}/>
        <AddIncExp type={props.type}/>
      </div>
      <button className={`${classes.btn} ${classes['btn--add']}`}>Submit {capitalize(props.name)}</button>
    </section>
  )
}

export default IncomeExpense