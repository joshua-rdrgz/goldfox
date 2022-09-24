import React from "react";

const AddIncome = () => {
  return (
    <div>
      <div>
        <label htmlFor="income-item" />
        <input type="text" name="income-item" id="income-item" placeholder="Item" />
      </div>
      <div>
        <label htmlFor="income-category" />
        <input
          type="text"
          name="income-category"
          id="income-category"
          placeholder="Category..."
        />
      </div>
      <div>
        <label htmlFor="income-amount" />
        <input
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
