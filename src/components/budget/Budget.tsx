import React from "react";

import Category from "./Category";

import classes from "../../styles/layout/budget/budget.module.scss";

const Budget = () => {
  return (
    <section className={classes.container}>
      <Category type="income" />
      <Category type="expense" />
    </section>
  );
};

export default Budget;
