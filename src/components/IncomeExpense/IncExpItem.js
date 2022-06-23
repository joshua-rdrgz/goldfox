import React from 'react'

import NumberWrapper from '../utilities/NumberWrapper'

import classes from '../../styles/layout/IncomeExpense/IncExpItem.module.scss';

function IncExpItem(props) {
  // DOT LEADERS
  const CATEGORY_DUMMY = 'sandwhiches and toast'
  const determineTotalLength = function (charLength) {
    let totalLength;
    if (charLength <= 9) totalLength = 75;
    if (charLength === 1) totalLength = 73;
    if (charLength > 9 && charLength <= 18) totalLength = 76;
    if (charLength > 18 && charLength <= 27) totalLength = 80;
    if (charLength === 27) totalLength = 82
    if (charLength > 27 && charLength <= 36) totalLength = 81;
    return totalLength;
  }
  const padLength = determineTotalLength(CATEGORY_DUMMY.length) - CATEGORY_DUMMY.length;
  const category = CATEGORY_DUMMY.padEnd(padLength, '. ');

  
  return (
    <div className={`${classes['inc-exp__container']}`}>
      {/* We'll want to map over this in actuality, what's here is the content that we'll map */}
      <div className={`${classes['inc-exp__item']}`}>
        <h5 className={`${classes['inc-exp__title']}`}>Item</h5>
        <p className={`${classes['inc-exp__category']}`}>{category}</p>
        <NumberWrapper className={`${classes['inc-exp__amount']}`}>$567</NumberWrapper>
      </div>
      <div className={`${classes['inc-exp__item']}`}>
        <h5 className={`${classes['inc-exp__title']}`}>Item</h5>
        <p className={`${classes['inc-exp__category']}`}>{category}</p>
        <NumberWrapper className={`${classes['inc-exp__amount']}`}>$567</NumberWrapper>
      </div>
    </div>
  )
}

export default IncExpItem