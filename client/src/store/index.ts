import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./reducers/budgetReducer";
import calculationsSlice from "./reducers/calculationsReducer";

export const createStore = () => {
  return configureStore({
    reducer: {
      budget: budgetSlice,
      calculations: calculationsSlice,
    },
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
