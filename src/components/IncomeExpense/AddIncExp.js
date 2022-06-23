import React from "react";

import classes from "../../styles/layout/IncomeExpense/AddIncExp.module.scss";

function AddIncExp() {
  return (
    <div className={`${classes["inc-exp__add"]}`}>
      <div className={`${classes["inc-exp__add-item"]}`}>
        <label htmlFor="item" />
        <input
          className={`${classes["inc-exp__add-input"]}`}
          type="text"
          name="item"
          id="item"
          placeholder="Item"
          size="6"
        />
      </div>
      <div className={`${classes["inc-exp__add-category"]}`}>
        <label htmlFor="category" />
        <input
          className={`${classes["inc-exp__add-input"]} ${classes['inc-exp__add-input-category']}`}
          type="text"
          name="category"
          id="category"
          placeholder="Category..."
          size="35"
        />
      </div>
      <div className={`${classes["inc-exp__add-amount"]}`}>
        <label htmlFor="amount" />
        <input
          className={`${classes["inc-exp__add-input"]}`}
          type="number"
          name="amount"
          id="amount"
          placeholder="$1,234"
          min="1"
          max="99999"
        />
      </div>
    </div>
  );
}

export default AddIncExp;
