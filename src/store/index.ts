import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./reducers/budgetReducer";

const store = configureStore({
  reducer: {
    budget: budgetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
