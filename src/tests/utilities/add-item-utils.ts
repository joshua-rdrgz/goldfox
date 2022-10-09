import {
  getElement,
  getIcon,
  getInputByPlaceholder,
  getInputByValue,
} from "./test-utils";
import userEvent from "@testing-library/user-event";

export const getAddItemInputs = () => {
  const itemAddInput = getInputByPlaceholder("Item");
  const categoryAddInput = getInputByPlaceholder("Category...");
  const amountAddInput = getInputByPlaceholder("$1,234");
  return {
    itemAddInput,
    categoryAddInput,
    amountAddInput,
  };
};

export const getEditItemInputs = () => {
  const itemEditInput = getInputByValue("item");
  const categoryEditInput = getInputByValue("category");
  const amountEditInput = getInputByValue("1234");
  return {
    itemEditInput,
    categoryEditInput,
    amountEditInput,
  };
};

interface AddItems {
  itemAddInput: HTMLElement;
  categoryAddInput: HTMLElement;
  amountAddInput: HTMLElement;
  capitalizedType: "Income" | "Expense";
  text?: {
    item: string;
    category: string;
    amount: string;
  };
}

export const addItems = ({
  itemAddInput,
  categoryAddInput,
  amountAddInput,
  capitalizedType,
  text,
}: AddItems) => {
  userEvent.type(itemAddInput, text?.item ? text?.item : "item");
  userEvent.type(categoryAddInput, text?.category ? text?.category : "category");
  userEvent.type(amountAddInput, text?.amount ? text?.amount : "1234");
  userEvent.click(getElement(`Submit ${capitalizedType}`));
};

export const createItems = (
  capitalizedType: "Income" | "Expense",
  text?: AddItems["text"]
) => {
  const { itemAddInput, categoryAddInput, amountAddInput } = getAddItemInputs();
  addItems({ itemAddInput, categoryAddInput, amountAddInput, capitalizedType, text });
  return {
    itemAddInput,
    categoryAddInput,
    amountAddInput,
  };
};

export const createEditInputs = () => {
  userEvent.click(getIcon("edit-item"));
  const { itemEditInput, categoryEditInput, amountEditInput } =
    getEditItemInputs();
  return {
    itemEditInput,
    categoryEditInput,
    amountEditInput,
  };
};
