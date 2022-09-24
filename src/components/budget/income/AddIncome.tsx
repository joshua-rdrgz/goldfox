import React from "react";

import classes from "../../../styles/layout/budget/addincexp.module.scss";

const AddIncome = () => {
  return (
    <div className={classes["inc-exp__add"]}>
      <div>
        <label htmlFor="income-item" />
        <input
          className={classes["inc-exp__add-input"]}
          type="text"
          name="income-item"
          id="income-item"
          placeholder="Item"
        />
      </div>
      <div className={classes["inc-exp__add-category"]}>
        <label htmlFor="income-category" />
        <input
          className={`${classes["inc-exp__add-input"]} ${classes["inc-exp__add-category"]}`}
          type="text"
          name="income-category"
          id="income-category"
          placeholder="Category..."
        />
      </div>
      <div className={classes["inc-exp__add-amount"]}>
        <label htmlFor="income-amount" />
        <input
          className={classes["inc-exp__add-input"]}
          type="number"
          name="income-amount"
          id="income-amount"
          placeholder="$1,234"
          min="1"
          max="99999"
        />
      </div>
    </div>
  );
};

export default AddIncome;
