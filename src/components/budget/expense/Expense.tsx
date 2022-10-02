import React from "react";

import ExpenseItems from "./ExpenseItems";
import AddExpense from "./AddExpense";

import classes from "../../../styles/layout/budget/incexp.module.scss";

const Expense = () => {
  return (
    <section className={classes["inc-exp"]}>
      <h4 className={classes["inc-exp__section-title"]}>
        Expense per month...
      </h4>
      <div className={classes["inc-exp__content"]}>
        <ExpenseItems />
        <AddExpense />
      </div>
      <button
        type="submit"
        form="add-expense"
        className={`${classes.btn} ${classes["btn--add"]}`}
      >
        Submit Expense
      </button>
    </section>
  );
};

export default Expense;
