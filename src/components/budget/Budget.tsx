import React from "react";

import Income from "./income/Income";
import Expense from "./expense/Expense";

const Budget = () => {
  return (
    <section>
      <Income />
      <Expense />
    </section>
  );
};

export default Budget;
