import React from "react";

import Header from "./components/header/Header";
import Balance from "./components/balance/Balance";
import Calculations from "./components/calculations/Calculations";
import Budget from "./components/budget/Budget";

function App() {
  return (
    <>
      <Header />
      <main>
        <Balance />
        <Calculations />
        <Budget />
      </main>
    </>
  );
}

export default App;
