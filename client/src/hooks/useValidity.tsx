import { useReducer } from "react";

import {
  ValidityState,
  ValidityAction,
  ValidityProps,
} from "./useValidityTypes";

const initAddValidityState: ValidityState = {
  itemIsValid: false,
  categoryIsValid: false,
  amountIsValid: false,
  formIsValid: false,
  formIsTouched: false,
};

const initEditValidityState: ValidityState = {
  itemIsValid: true,
  categoryIsValid: true,
  amountIsValid: true,
  formIsValid: true,
  formIsTouched: false,
};

const reducer = (state: ValidityState, action: ValidityAction) => {
  switch (action.type) {
    case "item":
      return { ...state, itemIsValid: action.payload };
    case "category":
      return { ...state, categoryIsValid: action.payload };
    case "amount":
      return { ...state, amountIsValid: action.payload };
    case "form-valid":
      return { ...state, formIsValid: action.payload };
    case "form-touched":
      return { ...state, formIsTouched: action.payload };
    default:
      throw new Error("Action Type Does Not Match");
  }
};

export const useValidity = ({ ref, type }: ValidityProps) => {
  const [validity, dispatchValidity] = useReducer(
    reducer,
    type === "add" ? initAddValidityState : initEditValidityState
  );

  const resetValidity: () => void = () => {
    ref.item.current!.value = "";
    ref.category.current!.value = "";
    ref.amount.current!.value = "";
    dispatchValidity({ type: "item", payload: type === "edit" ? true : false });
    dispatchValidity({
      type: "category",
      payload: type === "edit" ? true : false,
    });
    dispatchValidity({
      type: "amount",
      payload: type === "edit" ? true : false,
    });
    dispatchValidity({
      type: "form-valid",
      payload: type === "edit" ? true : false,
    });
    dispatchValidity({ type: "form-touched", payload: false });
  };

  const updateValidity = ({ ref }: ValidityProps) => {
    const enteredItem = ref.item.current?.value;
    const enteredCategory = ref.category.current?.value;
    const enteredAmount = ref.amount.current?.value;
    let formIsValid = true;

    if (enteredItem != null) {
      if (enteredItem.trim() !== "") {
        dispatchValidity({ type: "item", payload: true });
      } else {
        formIsValid = false;
        dispatchValidity({ type: "item", payload: false });
      }
    }
    if (enteredCategory != null) {
      if (enteredCategory.trim() !== "") {
        dispatchValidity({ type: "category", payload: true });
      } else {
        formIsValid = false;
        dispatchValidity({ type: "category", payload: false });
      }
    }
    if (enteredAmount != null) {
      if (enteredAmount.trim() !== "" && !Number.isNaN(+enteredAmount)) {
        dispatchValidity({ type: "amount", payload: true });
      } else {
        formIsValid = false;
        dispatchValidity({ type: "amount", payload: false });
      }
    }
    if (formIsValid) {
      dispatchValidity({ type: "form-valid", payload: true });
    } else {
      dispatchValidity({ type: "form-valid", payload: false });
    }
    if (!validity.formIsValid) {
      dispatchValidity({ type: "form-touched", payload: true });
    } else {
      dispatchValidity({ type: "form-touched", payload: false });
    }
  };

  return {
    validity,
    updateValidity,
    resetValidity,
  };
};
