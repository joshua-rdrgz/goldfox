import React from "react";

import IncomeItems from "./IncomeItems";
import AddIncome from "./AddIncome";

import classes from "../../../styles/layout/budget/incexp.module.scss";

const Income = () => {
  return (
    <section className={classes["inc-exp"]}>
      <h4 className={classes["inc-exp__section-title"]}>Income per month...</h4>
      <div className={classes["inc-exp__content"]}>
        <IncomeItems />
        <AddIncome />
      </div>
      <button className={`${classes.btn} ${classes["btn--add"]}`}>Submit Income</button>
    </section>
  );
};

export default Income;
