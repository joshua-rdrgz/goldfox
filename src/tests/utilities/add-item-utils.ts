import { getElement, getInputField } from "./test-utils";
import userEvent from "@testing-library/user-event";

export const getInputs = () => {
  const itemInput = getInputField("Item");
  const categoryInput = getInputField("Category...");
  const amountInput = getInputField("$1,234");
  return {
    itemInput,
    categoryInput,
    amountInput,
  };
};

interface AddItems {
  itemInput: HTMLElement;
  categoryInput: HTMLElement;
  amountInput: HTMLElement;
  capitalizedType: "Income" | "Expense";
}

export const addItems = ({
  itemInput,
  categoryInput,
  amountInput,
  capitalizedType,
}: AddItems) => {
  userEvent.type(itemInput, "item");
  userEvent.type(categoryInput, "category");
  userEvent.type(amountInput, "1234");
  userEvent.click(getElement(`Submit ${capitalizedType}`));
};
