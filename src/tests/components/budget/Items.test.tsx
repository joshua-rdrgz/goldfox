import { render, getElement } from "../../utilities/test-utils";
import { getInputs, addItems } from "../../utilities/add-item-utils";
import Category from "../../../components/budget/Category";

describe("Income Items component", () => {
  test(`shows "Please Enter Item" when there are no items`, () => {
    render(<Category type="income" />);
    checkNoItems("Income");
  });

  test(`adds item to the store's incomeItems component upon successful entry of item`, () => {
    render(<Category type="income" />);
    addItemChecker("Income");
  });
});

describe("Expense Items component", () => {
  test(`shows "Please Enter Item" when there are no items`, () => {
    render(<Category type="expense" />);
    checkNoItems("Expense");
  });

  test(`adds item to the store's expenseItems component upon successful entry of item`, () => {
    render(<Category type="expense" />);
    addItemChecker("Expense");
  });
});

function checkNoItems(capitalizedType: "Income" | "Expense") {
  expect(
    getElement(`Please Enter An ${capitalizedType} Item!`)
  ).toBeInTheDocument();
}

function addItemChecker(capitalizedType: "Income" | "Expense") {
  // captures AddItem input elements
  const { itemInput, categoryInput, amountInput } = getInputs();

  // creates an item to display
  // // itemInput = "item"
  // // categoryInput = "category"
  // // amountInput = "$1234"
  addItems({itemInput, categoryInput, amountInput, capitalizedType});

  // checks for empty values in AddItem input fields
  expect(itemInput).toHaveValue("");
  expect(categoryInput).toHaveValue("");
  expect(amountInput).toHaveValue(null);

  // checks for existence of created item in Items component.
  expect(getElement("item")).toBeInTheDocument();
  expect(getElement("category")).toBeInTheDocument();
  expect(getElement("$1234")).toBeInTheDocument();

}
