import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialState,
  BudgetItem,
  EditItem,
  DeleteItem,
} from "../../types/store/reducers/budgetReducerTypes";

const initialState: InitialState = {
  incomeItems: [],
  expenseItems: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BudgetItem>) {
      const type = action.payload.type;
      if (type === "income") {
        state.incomeItems.push(action.payload);
      } else {
        state.expenseItems.push(action.payload);
      }
    },
    editItem(state, action: PayloadAction<EditItem>) {
      const type = action.payload.type;
      if (type === "income") {
        state.incomeItems[action.payload.index] = action.payload.changeTo;
      } else {
        state.expenseItems[action.payload.index] = action.payload.changeTo;
      }
    },
    deleteItem(state, action: PayloadAction<DeleteItem>) {
      const type = action.payload.type;
      if (type === "income") {
        state.incomeItems.splice(action.payload.index, 1);
      } else {
        state.expenseItems.splice(action.payload.index, 1);
      }
    },
    resetBudget(state) {
      state.expenseItems = [];
      state.incomeItems = [];
    },
  },
});

export const budgetActions = budgetSlice.actions;
export default budgetSlice.reducer;
