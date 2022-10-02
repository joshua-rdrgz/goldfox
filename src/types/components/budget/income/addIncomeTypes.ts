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
