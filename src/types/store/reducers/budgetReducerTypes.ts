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
  type: string;
  index: number;
  changeTo: BudgetItem;
}

export interface DeleteItem {
  type: string;
  index: number;
}
