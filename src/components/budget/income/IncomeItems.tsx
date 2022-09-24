import React from "react";

import Number from "../../utilities/Number";

import classes from "../../../styles/layout/budget/incexpitems.module.scss";

const IncomeItems = () => {
  return (
    <div className={classes["inc-exp__container"]}>
      <div className={classes["inc-exp__item"]}>
        <h5 className={classes["inc-exp__title"]}>Item</h5>
        <p className={classes["inc-exp__category"]}>Category</p>
        <Number className={classes["inc-exp__amount"]}>$567</Number>
      </div>
      <div className={classes["inc-exp__item"]}>
        <h5 className={classes["inc-exp__title"]}>Item</h5>
        <p className={classes["inc-exp__category"]}>Category</p>
        <Number className={classes["inc-exp__amount"]}>$567</Number>
      </div>
    </div>
  );
};

export default IncomeItems;
