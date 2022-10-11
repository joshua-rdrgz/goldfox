import { render, getIcon, getElement, queryElement, getById } from "../../utilities/test-utils";
import {
  createEditInputs,
  createItems,
} from "../../utilities/add-item-utils";
import userEvent from "@testing-library/user-event";
import Category from "../../../components/budget/Category";

describe("Income Singular Item Component", () => {
  runTests("income", "Income");
});

describe("Expense Singular Item Component", () => {
  runTests("expense", "Expense");
});

function runTests(type: "income" | "expense", capitalizedType: "Income" | "Expense") {
  test("displays edit form when edit button is clicked", () => {
    render(<Category type={type} />);
    checkEditFormExistence(capitalizedType);
  });
  test("edits item when submitting edit form", () => {
    render(<Category type={type} />);
    checkEditFormEditsItem(capitalizedType);
  });
  test("displays error messages and won't submit upon empty edit form values", () => {
    render(<Category type={type} />);
    checkEditFormValidity(capitalizedType);
  });
  test("deletes item upon trash icon click", () => {
    render(<Category type={type} />);
    checkDeleteIconRemovesItem(capitalizedType);
  });
}

function checkEditFormExistence(capitalizedType: "Income" | "Expense") {
  createItems(capitalizedType);

  const { itemEditInput, categoryEditInput, amountEditInput } =
    createEditInputs();

  expect(itemEditInput).toBeInTheDocument();
  expect(categoryEditInput).toBeInTheDocument();
  expect(amountEditInput).toBeInTheDocument();
}

function checkEditFormEditsItem(capitalizedType: "Income" | "Expense") {
  createItems(capitalizedType);

  const { itemEditInput, categoryEditInput, amountEditInput } =
    createEditInputs();

  // edit inputs
  userEvent.type(itemEditInput, "s");
  userEvent.type(categoryEditInput, "s");
  userEvent.type(amountEditInput, "5");
  userEvent.click(getIcon("edit-item"));

  // expect edited versions to be present
  expect(getElement("items")).toBeInTheDocument();
  expect(getElement("categorys")).toBeInTheDocument();
  expect(getElement("$12,345")).toBeInTheDocument();
}

function checkEditFormValidity(capitalizedType: "Income" | "Expense") {
  createItems(capitalizedType);

  const { itemEditInput, categoryEditInput, amountEditInput } =
    createEditInputs();

  // clears inputs
  userEvent.clear(itemEditInput);
  userEvent.clear(categoryEditInput);
  userEvent.clear(amountEditInput);
  // attempts to submit form (shouldn't work)
  userEvent.click(getIcon("edit-item"));

  // checks for error messages
  expect(getElement("Please enter the following fields:")).toBeInTheDocument();
  expect(getElement("Please enter an item.")).toBeInTheDocument();
  expect(getElement("Please enter a category.")).toBeInTheDocument();
  expect(getElement("Please enter a valid amount.")).toBeInTheDocument();
}

function checkDeleteIconRemovesItem(capitalizedType: "Income" | "Expense") {
  createItems(capitalizedType, { item: "item1", category: "category1", amount: "1"});
  createItems(capitalizedType, { item: "item2", category: "category2", amount: "2"});
  createItems(capitalizedType, { item: "item3", category: "category3", amount: "3"});

  // deletes "item1" item
  userEvent.click(getById("delete-button-1"));

  expect(queryElement("item1")).not.toBeInTheDocument();
  expect(getElement("item2")).toBeInTheDocument();
  expect(getElement("item3")).toBeInTheDocument();

  // deletes "item2" item
  userEvent.click(getById("delete-button-1"));

  expect(queryElement("item1")).not.toBeInTheDocument();
  expect(queryElement("item2")).not.toBeInTheDocument();
  expect(getElement("item3")).toBeInTheDocument();
}
