import React from 'react'

import IncExpItem from './IncExpItem'
import AddIncExp from './AddIncExp';

function IncomeExpense() {
  return (
    <section>
      <h4>Income/Expense per month...</h4>
      <div>
        <IncExpItem />
        <AddIncExp />
      </div>
    </section>
  )
}

export default IncomeExpense