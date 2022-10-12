import React from "react";

import Header from "./components/header/Header";
import Balance from "./components/balance/Balance";
import Calculations from "./components/calculations/Calculations";
import Budget from "./components/budget/Budget";

import "./styles/App.module.scss";
import classes from "./styles/App.module.scss";

function App() {
  return (
    <>
      <Header />
      <main>
        <p
          className={`${classes.description} ${classes.description__text} ${classes.description__top}`}
        >
          Welcome to GoldFox, a net worth projector!
        </p>
        <p className={`${classes.description} ${classes.description__text}`}>
          Please enter the following to see how your net worth will change over
          the course of the next 6 months!
        </p>
        <ul className={`${classes.description} ${classes.description__ul}`}>
          <li className={`${classes.description__li}`}>
            your incomes per month
          </li>
          <li className={`${classes.description__li}`}>
            your expenses per month
          </li>
          <li className={`${classes.description__li}`}>
            your current net worth
          </li>
        </ul>
        <Budget />
        <Balance />
        <Calculations />
      </main>
    </>
  );
}

export default App;
