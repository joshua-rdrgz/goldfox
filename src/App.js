import React, { Fragment } from 'react';

import './styles/App.module.scss';

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
        <IncomeExpense type="income"/>
        <IncomeExpense type="expenses"/>
      </main>
    </Fragment>
  );
}

export default App;
