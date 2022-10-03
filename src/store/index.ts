import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./reducers/budgetReducer";

export const createStore = () => {
  return configureStore({
    reducer: {
      budget: budgetSlice,
    },
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
