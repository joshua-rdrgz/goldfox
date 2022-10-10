import React from "react";
import Number from "../utility-components/Number";
import { MonthType } from "../../types/components/calculations/monthTypes";
import classes from "../../styles/layout/calculations/month.module.scss";

const dateFormatter = new Intl.DateTimeFormat("default", {
  month: "long",
  year: "numeric",
});
const monthInMils = 2629800000;
const curMonth = dateFormatter.format(Date.now());
const nextMonth = dateFormatter.format(Date.now() + monthInMils);

const Month = ({ month, netWorth, difference }: MonthType) => {
  const differenceString =
    difference > 0
      ? `$${Math.abs(difference).toLocaleString()} higher than last month`
      : difference === 0
      ? "no different from last month"
      : `$${Math.abs(difference).toLocaleString()} lower than last month`;

  const monthString =
    month === curMonth
      ? "This Month"
      : month === nextMonth
      ? "Next Month"
      : month;

  return (
    <div className={classes.month}>
      <h5 className={classes.month__title}>{monthString}</h5>
      <p className={classes.month__text}>Your net worth will be...</p>
      <Number
        className={`${classes.month__amount} ${
          netWorth < 0 && classes["month__amount-error"]
        } ${netWorth === 0 && classes["month__amount-warning"]}`}
      >{`$${netWorth.toLocaleString()}`}</Number>
      <p
        className={classes.month__text}
      >{`Which is ${differenceString}`}</p>
      {netWorth === 0 && <p className={classes["month__amount-warning-text"]}> You've got no money!</p>}
      {netWorth < 0 && <p className={classes["month__amount-error-text"]}> You're in the negative!</p>}
    </div>
  );
};

export default Month;
