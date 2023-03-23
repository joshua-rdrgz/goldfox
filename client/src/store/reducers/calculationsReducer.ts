import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialCalcState,
  CalcPayload,
} from "../../types/store/reducers/calculationsReducerTypes";

const initialState: InitialCalcState = {
  balance: 0,
  amounts: {
    income: [],
    expense: [],
  },
  howManyMonths: 6,
  results: [],
};

const performCalculations = ({
  balance,
  amounts,
  howManyMonths,
}: CalcPayload) => {
  const incomeSum = amounts.income.reduce(
    (prevIncome, curIncome) => prevIncome + curIncome,
    0
  );
  const expenseSum = amounts.expense.reduce(
    (prevExpense, curExpense) => prevExpense + curExpense,
    0
  );
  let prevBalance = balance;
  const results: number[] = [];
  const differences: number[] = [];

  for (let month = 1; month <= howManyMonths; month++) {
    const curBalance = prevBalance + incomeSum - expenseSum;
    results.push(curBalance);
    differences.push(curBalance - prevBalance);
    prevBalance = curBalance;
  }

  return [results, differences];
};

const calculationsSlice = createSlice({
  name: "calculations",
  initialState,
  reducers: {
    calculateNetWorth(state, action: PayloadAction<CalcPayload>) {
      const [calcResults, calcDifferences] = performCalculations({
        balance: action.payload.balance,
        amounts: action.payload.amounts,
        howManyMonths: action.payload.howManyMonths,
      });
      const dateFormatter = new Intl.DateTimeFormat("default", {
        month: "long", year: "numeric"
      });
      const now = new Date().getTime();
      const monthInMils = 2629800000;

      state.results = [];
      for (let idx = 0; idx < state.howManyMonths; idx++) {
        const monthToDisplay = dateFormatter.format(now + monthInMils * idx);
        state.results.push({
          month: monthToDisplay,
          netWorth: calcResults[idx],
          difference: calcDifferences[idx],
        });
      }
    },
    setBalances(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    gatherAmounts(state, action: PayloadAction<InitialCalcState["amounts"]>) {
      state.amounts.income = action.payload.income;
      state.amounts.expense = action.payload.expense;
    },
    resetCalculations(state) {
      state.amounts.expense = [];
      state.amounts.income = [];
      state.balance = 0;
      state.howManyMonths = 6;
      state.results = [];
    },
  },
});

export const calculationsActions = calculationsSlice.actions;
export default calculationsSlice.reducer;
