import React from 'react'

import IncExpItem from './IncExpItem'
import AddIncExp from './AddIncExp';

const capitalize = function (str) {
  return str[0].toUpperCase() + str.slice(1);
}

function IncomeExpense(props) {
  return (
    <section className={`${props.type}`}>
      <h4 className={`${props.type}__section-title`}>{capitalize(props.type)} per month...</h4>
      <div className={`${props.type}__content`}>
        <IncExpItem type={props.type}/>
        <AddIncExp type={props.type}/>
      </div>
    </section>
  )
}

export default IncomeExpense