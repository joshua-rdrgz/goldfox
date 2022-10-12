import { render } from "../../utilities/test-utils";
import { getById, getElement } from "../../utilities/test-utils";
import { calculate } from "../../utilities/calculations-utils";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

describe("Start Over Component", () => {
  test("clears all inputs upon button press", () => {
    render(<App />);
    const { balanceInput, income, expense } = getAllInputs();
    calculate({
      incomeAmounts: ["98", "102", "3,578"],
      expenseAmounts: ["92", "143", "3,569"],
      balance: "673",
    });

    userEvent.click(getElement("Start Over"));

    expect(balanceInput).toBeEmptyDOMElement();
    expect(income.itemInput).toBeEmptyDOMElement();
    expect(income.categoryInput).toBeEmptyDOMElement();
    expect(income.amountInput).toBeEmptyDOMElement();
    expect(expense.itemInput).toBeEmptyDOMElement();
    expect(expense.categoryInput).toBeEmptyDOMElement();
    expect(expense.amountInput).toBeEmptyDOMElement();
  });
  test("clears all data upon button press", () => {
    render(<App />);
    calculate({
      incomeAmounts: ["98", "102", "3,578"],
      expenseAmounts: ["92", "143", "3,569"],
      balance: "673",
    });

    userEvent.click(getElement("Start Over"));

    expect(getElement("Please enter a Balance!")).toBeInTheDocument();
    expect(getElement("Please Enter An Income Item!")).toBeInTheDocument();
    expect(getElement("Please Enter An Expense Item!")).toBeInTheDocument();
  });
});

function getAllInputs() {
  return {
    balanceInput: getById("balance"),
    income: {
      itemInput: getById("income-item"),
      categoryInput: getById("income-category"),
      amountInput: getById("income-amount"),
    },
    expense: {
      itemInput: getById("expense-item"),
      categoryInput: getById("expense-category"),
      amountInput: getById("expense-amount"),
    },
  };
}
