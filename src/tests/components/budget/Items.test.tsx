import { render, getElement } from "../../utilities/test-utils";
import { createItems } from "../../utilities/add-item-utils";
import Category from "../../../components/budget/Category";

describe("Income Items component", () => {
  runTests("income", "Income");
});

describe("Expense Items component", () => {
  runTests("expense", "Expense");
});

function runTests(type: "income" | "expense", capitalizedType: "Income" | "Expense") {
  test(`shows "Please Enter Item" when there are no items`, () => {
    render(<Category type={type} />);
    checkNoItems(capitalizedType);
  });

  test(`adds item to the store's expenseItems component upon successful entry of item`, () => {
    render(<Category type={type} />);
    addItemChecker(capitalizedType);
  });
}

function checkNoItems(capitalizedType: "Income" | "Expense") {
  expect(
    getElement(`Please Enter An ${capitalizedType} Item!`)
  ).toBeInTheDocument();
}

function addItemChecker(capitalizedType: "Income" | "Expense") {
  const { itemAddInput, categoryAddInput, amountAddInput } = createItems(capitalizedType);

  // checks for empty values in AddItem input fields
  expect(itemAddInput).toHaveValue("");
  expect(categoryAddInput).toHaveValue("");
  expect(amountAddInput).toHaveValue(null);

  // checks for existence of created item in Items component.
  expect(getElement("item")).toBeInTheDocument();
  expect(getElement("category")).toBeInTheDocument();
  expect(getElement("$1234")).toBeInTheDocument();

}
