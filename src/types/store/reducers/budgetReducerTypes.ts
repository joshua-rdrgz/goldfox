export interface InitialState {
  incomeItems: BudgetItem[];
  expenseItems: BudgetItem[];
}

export interface BudgetItem {
  type: "income" | "expense";
  item: string | undefined;
  category: string | undefined;
  amount: string | undefined;
}

export interface EditItem {
  type: "income" | "expense";
  index: number;
  changeTo: BudgetItem;
}

export interface DeleteItem {
  type: "income" | "expense";
  index: number;
}
