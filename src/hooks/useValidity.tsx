import { useReducer } from 'react';

import {
  ValidityState,
  ValidityAction,
  Ref
} from "./useValidityTypes";

const initValidityState: ValidityState = {
  itemIsValid: false,
  categoryIsValid: false,
  amountIsValid: false,
  formIsValid: false,
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

export const useValidity = (ref: Ref) => {
  const [validity, dispatchValidity] = useReducer(reducer, initValidityState);

  const resetValidity: () => void = () => {
    ref.item.current!.value = "";
    ref.category.current!.value = "";
    ref.amount.current!.value = "";
    dispatchValidity({ type: "item", payload: false });
    dispatchValidity({ type: "category", payload: false });
    dispatchValidity({ type: "amount", payload: false });
    dispatchValidity({ type: "form-valid", payload: false });
    dispatchValidity({ type: "form-touched", payload: false });
  };

  const updateValidity = (ref: Ref) => {
    const enteredItem = ref.item.current?.value;
    const enteredCategory = ref.category.current?.value;
    const enteredAmount = ref.amount.current?.value;
    let formIsValid = true;

    if (enteredItem !== undefined) {
      if (enteredItem.trim() !== "") {
        dispatchValidity({ type: "item", payload: true });
      } else {
        formIsValid = false;
        dispatchValidity({ type: "item", payload: false });
      }
    }
    if (enteredCategory !== undefined) {
      if (enteredCategory.trim() !== "") {
        dispatchValidity({ type: "category", payload: true });
      } else {
        formIsValid = false;
        dispatchValidity({ type: "category", payload: false });
      }
    }
    if (enteredAmount !== undefined) {
      if (enteredAmount.trim() !== "") {
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
