import { render, getElement, getInputField } from "../../utilities/test-utils";
import userEvent from "@testing-library/user-event";
import Category from "../../../components/budget/Category";

describe("AddItem Income component", () => {
  test(`will display all error messages if user doesn't add anything`, () => {
    render(<Category type="income" />);
    errorChecker("Income");
  });

  test(`will push item to the store's incomeItems component upon successful entry of item`, () => {
    render(<Category type="income" />);
    addItemChecker("Income");
  });
});

describe("AddItem Expense component", () => {
  test(`will display all error messages if user doesn't add anything`, () => {
    render(<Category type="expense" />);
    errorChecker("Expense");
  });

  test(`will push item to the store's expenseItems component upon successful entry of item`, () => {
    render(<Category type="expense" />);
    addItemChecker("Expense");
  });
});

function addItemChecker (capitalizedType: string) {
  // captures input elements
  const itemInput = getInputField("Item");
  const categoryInput = getInputField("Category...");
  const amountInput = getInputField("$1,234");

  // creates an item to display
  userEvent.type(itemInput, "item");
  userEvent.type(categoryInput, "category");
  userEvent.type(amountInput, "1234");
  userEvent.click(getElement(`Submit ${capitalizedType}`));

  // checks for empty values in input fields
  expect(itemInput).toHaveValue("");
  expect(categoryInput).toHaveValue("");
  expect(amountInput).toHaveValue(null);

  // checks for existence of created item above.
  expect(getElement("item")).toBeInTheDocument();
  expect(getElement("category")).toBeInTheDocument();
  expect(getElement("$1234")).toBeInTheDocument();
};

function errorChecker (capitalizedType: string) {
  userEvent.click(getElement(`Submit ${capitalizedType}`));

  // overall form error message
  expect(getElement("Please enter the following fields:")).toBeInTheDocument();

  // item error message
  expect(getElement(`Please enter the "Item".`)).toBeInTheDocument();

  // category error message
  expect(getElement(`Please enter the "Category".`)).toBeInTheDocument();

  // amount error message
  expect(getElement(`Please enter the "Amount".`)).toBeInTheDocument();
};
