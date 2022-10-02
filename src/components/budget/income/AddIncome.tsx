import React, { useRef, useReducer, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { budgetActions } from "../../../store/reducers/budgetReducer";

import {
  ValidityState,
  ValidityAction,
} from "../../../types/components/budget/income/addIncomeTypes";

import classes from "../../../styles/layout/budget/addincexp.module.scss";

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

const AddIncome = () => {
  const [validity, dispatchValidity] = useReducer(reducer, initValidityState);

  const incomeItems = useAppSelector((state) => state.budget.incomeItems);
  console.log(incomeItems);

  const dispatch = useAppDispatch();

  const incomeItem = useRef<HTMLInputElement | null>(null);
  const incomeCategory = useRef<HTMLInputElement | null>(null);
  const incomeAmount = useRef<HTMLInputElement | null>(null);

  const showErrorFields = validity.formIsTouched && !validity.formIsValid;

  const resetValidity: () => void = () => {
    incomeItem.current!.value = "";
    incomeCategory.current!.value = "";
    incomeAmount.current!.value = "";
    dispatchValidity({ type: "item", payload: false });
    dispatchValidity({ type: "category", payload: false });
    dispatchValidity({ type: "amount", payload: false });
    dispatchValidity({ type: "form-valid", payload: false });
    dispatchValidity({ type: "form-touched", payload: false });
  };

  useEffect(() => {
    console.log(validity);

    const enteredItem = incomeItem.current!.value;
    const enteredCategory = incomeCategory.current!.value;
    const enteredAmount = incomeAmount.current!.value;

    if (
      validity.itemIsValid &&
      validity.categoryIsValid &&
      validity.amountIsValid
    ) {
      dispatch(
        budgetActions.addItem({
          type: "income",
          item: enteredItem,
          category: enteredCategory,
          amount: enteredAmount,
        })
      );
      resetValidity();
    }
  }, [validity]);

  const addItemHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredItem = incomeItem.current?.value;
    const enteredCategory = incomeCategory.current?.value;
    const enteredAmount = incomeAmount.current?.value;
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

  return (
    <>
      {showErrorFields && <p>Please enter the following fields:</p>}
      <form
        onSubmit={addItemHandler}
        className={classes["inc-exp__add"]}
        id="add-income"
      >
        <div>
          <label htmlFor="income-item" />
          <input
            className={classes["inc-exp__add-input"]}
            type="text"
            name="income-item"
            id="income-item"
            placeholder="Item"
            ref={incomeItem}
          />
          {showErrorFields && !validity.itemIsValid && (
            <p>Please enter the "Item".</p>
          )}
        </div>
        <div className={classes["inc-exp__add-category"]}>
          <label htmlFor="income-category" />
          <input
            className={`${classes["inc-exp__add-input"]} ${classes["inc-exp__add-category"]}`}
            type="text"
            name="income-category"
            id="income-category"
            placeholder="Category..."
            ref={incomeCategory}
          />
          {showErrorFields && !validity.categoryIsValid && (
            <p>Please enter the "Category".</p>
          )}
        </div>
        <div className={classes["inc-exp__add-amount"]}>
          <label htmlFor="income-amount" />
          <input
            className={classes["inc-exp__add-input"]}
            type="number"
            name="income-amount"
            id="income-amount"
            placeholder="$1,234"
            min="1"
            max="99999"
            ref={incomeAmount}
          />
          {showErrorFields && !validity.amountIsValid && (
            <p>Please enter the "Amount".</p>
          )}
        </div>
      </form>
    </>
  );
};

export default AddIncome;
