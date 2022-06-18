import React from "react";

import classes from '../../styles/layout/Six-Month-View/OneMonthView.module.scss';

import NumberWrapper from "../utilities/NumberWrapper";

function OneMonthView() {
  return (
    <div className={classes.month}>
      <h5 className={classes.month__title}>This month</h5>
      <NumberWrapper className={classes.month__amount}>$4,248</NumberWrapper>
      <p className={classes.month__comparison}>$234 higher</p>
    </div>
  );
}

export default OneMonthView;
