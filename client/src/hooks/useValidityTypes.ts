export interface ValidityState {
  itemIsValid: boolean;
  categoryIsValid: boolean;
  amountIsValid: boolean;
  formIsValid: boolean;
  formIsTouched: boolean;
}

export interface ValidityAction {
  type: "item" | "category" | "amount" | "form-valid" | "form-touched";
  payload: boolean;
}

export interface ValidityProps {
  ref: {
    item: React.MutableRefObject<HTMLInputElement | null>;
    category: React.MutableRefObject<HTMLInputElement | null>;
    amount: React.MutableRefObject<HTMLInputElement | null>;
  };
  type: "add" | "edit";
}
