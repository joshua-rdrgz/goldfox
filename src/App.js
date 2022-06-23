import React, { Fragment } from 'react';

import './styles/App.module.scss';
import classes from './styles/layout/IncomeExpense/IncomeExpense.module.scss';

import Header from './components/Header/Header';
import OriginalBalance from './components/OriginalBalance';
import SixMonthView from './components/Six-Month-View/SixMonthView';
import IncomeExpense from './components/IncomeExpense/IncomeExpense';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <OriginalBalance />
        <SixMonthView />
        <div className={classes.container}>
          <IncomeExpense type="income" name="income"/>
          <IncomeExpense type="expenses" name="expense"/>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
