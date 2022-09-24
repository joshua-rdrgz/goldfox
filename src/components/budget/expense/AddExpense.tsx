import React from "react";

import classes from "../../../styles/layout/budget/addincexp.module.scss";

const AddExpense = () => {
  return (
    <div className={classes["inc-exp__add"]}>
      <div>
        <label htmlFor="expense-item" />
        <input
          className={classes["inc-exp__add-input"]}
          type="text"
          name="expense-item"
          id="expense-item"
          placeholder="Item"
        />
      </div>
      <div className={classes["inc-exp__add-category"]}>
        <label htmlFor="expense-category" />
        <input
          className={`${classes["inc-exp__add-input"]} ${classes["inc-exp__add-category"]}`}
          type="text"
          name="expense-category"
          id="expense-category"
          placeholder="Category..."
        />
      </div>
      <div className={classes["inc-exp__add-amount"]}>
        <label htmlFor="expense-amount" />
        <input
          className={classes["inc-exp__add-input"]}
          type="number"
          name="expense-amount"
          id="expense-amount"
          placeholder="$1,234"
          min="1"
          max="99999"
        />
      </div>
    </div>
  );
};

export default AddExpense;
