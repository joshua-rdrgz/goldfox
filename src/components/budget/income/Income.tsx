import React from "react";

import IncomeItems from "./IncomeItems";
import AddIncome from "./AddIncome";

const Income = () => {
  return (
    <section>
      <h4>Income per month...</h4>
      <div>
        <IncomeItems />
        <AddIncome />
      </div>
      <button>Submit Income</button>
    </section>
  );
};

export default Income;
