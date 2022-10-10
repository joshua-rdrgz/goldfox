import { BudgetItem } from '../../store/reducers/budgetReducerTypes';

export interface ItemType {
  item: BudgetItem;
  itemIndex: number;
}

export interface ReducerState {
  isEditing: boolean;
  edited: {
    item: string | undefined;
    category: string | undefined;
    amount: string;
  }
};

export interface ReducerAction {
  type: "item" | "category" | "amount" | "isEditing";
  payload?: string;
};