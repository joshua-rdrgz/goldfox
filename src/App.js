import React, { Fragment } from 'react';

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
        <IncomeExpense />
        <IncomeExpense />
      </main>
    </Fragment>
  );
}

export default App;
