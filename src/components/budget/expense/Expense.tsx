import React from "react";

import ExpenseItems from "./ExpenseItems";
import AddExpense from "./AddExpense";

const Expense = () => {
  return (
    <section>
      <h4>Expense per month...</h4>
      <div>
        <ExpenseItems />
        <AddExpense />
      </div>
      <button>Submit Expense</button>
    </section>
  );
};

export default Expense;
