import { getById, getElement } from "../utilities/test-utils";
import userEvent from "@testing-library/user-event";

interface CalculateType {
  incomeAmounts: string | string[];
  expenseAmounts: string | string[];
  balance: string;
}

export const calculate = ({
  incomeAmounts,
  expenseAmounts,
  balance,
}: CalculateType) => {
  // Add Items to the calculations
  const itemIncomeInput = getById("income-item");
  const itemExpenseInput = getById("expense-item");
  const categoryIncomeInput = getById("income-category");
  const categoryExpenseInput = getById("expense-category");
  const amountIncomeInput = getById("income-amount");
  const amountExpenseInput = getById("expense-amount");

  if (Array.isArray(incomeAmounts)) {
    incomeAmounts.forEach((incomeAmount, incIdx) => {
      userEvent.type(itemIncomeInput, `Income item ${incIdx + 1}`);
      userEvent.type(categoryIncomeInput, `Income category ${incIdx + 1}`);
      userEvent.type(amountIncomeInput, incomeAmount);
      userEvent.click(getElement("Submit Income"));
    });
  } else {
    userEvent.type(itemIncomeInput, "Income item 1");
    userEvent.type(categoryIncomeInput, "Income category 1");
    userEvent.type(amountIncomeInput, incomeAmounts);
    userEvent.click(getElement("Submit Income"));
  }

  if (Array.isArray(expenseAmounts)) {
    expenseAmounts.forEach((expenseAmount, expIdx) => {
      userEvent.type(itemExpenseInput, `Expense item ${expIdx + 1}`);
      userEvent.type(categoryExpenseInput, `Expense category ${expIdx + 1}`);
      userEvent.type(amountExpenseInput, expenseAmount);
      userEvent.click(getElement("Submit Expense"));
    });
  } else {
    userEvent.type(itemExpenseInput, "Expense item 1");
    userEvent.type(categoryExpenseInput, "Expense category 1");
    userEvent.type(amountExpenseInput, expenseAmounts);
    userEvent.click(getElement("Submit Expense"));
  }

  // Add balance to input
  const balanceInput = getById("balance");
  userEvent.type(balanceInput, balance);
  userEvent.click(getElement("Calculate"));
};
