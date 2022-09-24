import React from "react";

import Income from "./income/Income";
import Expense from "./expense/Expense";

import classes from "../../styles/layout/budget/budget.module.scss";

const Budget = () => {
  return (
    <section className={classes.container}>
      <Income />
      <Expense />
    </section>
  );
};

export default Budget;
