import React from "react";
import { screen } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../store";

export const render = (component: React.ReactNode) => {
  return rtlRender(
    <Provider store={createStore()}>
      {component}
    </Provider>
  );
};

export const getInputField = (placeholderText: string) => {
  return screen.getByPlaceholderText(placeholderText);
};

export const getElement = (text: string) => {
  return screen.getByText(text, { exact: false });
};