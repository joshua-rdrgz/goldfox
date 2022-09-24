import React from "react";

const AddExpense = () => {
  return (
    <div>
    <div>
      <label htmlFor="expense-item" />
      <input type="text" name="expense-item" id="expense-item" placeholder="Item" />
    </div>
    <div>
      <label htmlFor="expense-category" />
      <input
        type="text"
        name="expense-category"
        id="expense-category"
        placeholder="Category..."
      />
    </div>
    <div>
      <label htmlFor="expense-amount" />
      <input
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
