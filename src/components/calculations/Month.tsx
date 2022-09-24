import React from "react";

import Number from "../utilities/Number";

import classes from "../../styles/layout/calculations/month.module.scss";

const Month = () => {
  return (
    <div className={classes.month}>
      <h5 className={classes.month__title}>This month</h5>
      <Number className={classes.month__amount}>$1,234</Number>
      <p className={classes.month__comparison}>$123 higher</p>
    </div>
  );
};

export default Month;
