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

export const getInputByPlaceholder = (placeholderText: string) => {
  return screen.getByPlaceholderText(placeholderText);
};

export const getInputByValue = (valueText: string) => {
  return screen.getByDisplayValue(valueText);
}

export const getElement = (text: string) => {
  return screen.getByText(text, { exact: false });
};

export const queryElement = (text: string) => {
  return screen.queryByText(text, { exact: false });
}

export const getIcon = (ariaLabel: string) => {
  return screen.getByRole('button', { name: ariaLabel });
}

export const getById = (id: string) => {
  return screen.getByTestId(id);
}