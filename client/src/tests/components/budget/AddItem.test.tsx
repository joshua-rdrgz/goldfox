import { render, getElement } from "../../utilities/test-utils";
import userEvent from "@testing-library/user-event";
import Category from "../../../components/budget/Category";

describe("AddItem Income component", () => {
  test(`will display all error messages if user doesn't add anything`, () => {
    render(<Category type="income" />);
    errorChecker("Income");
  });
});

describe("AddItem Expense component", () => {
  test(`will display all error messages if user doesn't add anything`, () => {
    render(<Category type="expense" />);
    errorChecker("Expense");
  });
});

function errorChecker(capitalizedType: string) {
  userEvent.click(getElement(`Submit ${capitalizedType}`));

  expect(getElement("Please enter the following fields:")).toBeInTheDocument(); // Overall form
  expect(getElement(`Please enter the "Item".`)).toBeInTheDocument(); // Item input
  expect(getElement(`Please enter the "Category".`)).toBeInTheDocument(); // Category input
  expect(getElement(`Please enter the "Amount".`)).toBeInTheDocument(); // Amount input
}
