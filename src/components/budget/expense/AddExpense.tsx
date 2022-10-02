import React, { useRef, useEffect } from "react";
import { useValidity } from "../../../hooks/useValidity";

import { useAppDispatch } from "../../../store/store-hooks";
import { budgetActions } from "../../../store/reducers/budgetReducer";

import classes from "../../../styles/layout/budget/addincexp.module.scss";

const AddExpense = () => {
  const dispatch = useAppDispatch();

  const expenseItem = useRef<HTMLInputElement | null>(null);
  const expenseCategory = useRef<HTMLInputElement | null>(null);
  const expenseAmount = useRef<HTMLInputElement | null>(null);

  const validityObject = {
    item: expenseItem,
    category: expenseCategory,
    amount: expenseAmount,
  };

  const { validity, updateValidity, resetValidity } =
    useValidity(validityObject);

  const showErrorFields = validity.formIsTouched && !validity.formIsValid;

  useEffect(() => {
    const enteredItem = expenseItem.current!.value;
    const enteredCategory = expenseCategory.current!.value;
    const enteredAmount = expenseAmount.current!.value;

    if (validity.formIsValid) {
      dispatch(
        budgetActions.addItem({
          type: "expense",
          item: enteredItem,
          category: enteredCategory,
          amount: enteredAmount,
        })
      );
      resetValidity();
    }
  }, [validity]);

  const addItemHandler: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    updateValidity(validityObject);
  };

  return (
    <>
      {showErrorFields && (
        <p
          className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-form"]}`}
        >
          Please enter the following fields:
        </p>
      )}
      <form
        onSubmit={addItemHandler}
        className={classes["inc-exp__add"]}
        id="add-expense"
      >
        <div>
          <label htmlFor="expense-item" />
          <input
            className={classes["inc-exp__add-input"]}
            type="text"
            name="expense-item"
            id="expense-item"
            placeholder="Item"
            ref={expenseItem}
          />
          {showErrorFields && !validity.itemIsValid && (
            <p
              className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-item"]}`}
            >
              Please enter the "Item".
            </p>
          )}
        </div>
        <div className={classes["inc-exp__add-category"]}>
          <label htmlFor="expense-category" />
          <input
            className={`${classes["inc-exp__add-input"]} ${classes["inc-exp__add-category"]}`}
            type="text"
            name="expense-category"
            id="expense-category"
            placeholder="Category..."
            ref={expenseCategory}
          />
          {showErrorFields && !validity.categoryIsValid && (
            <p
              className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-item"]}`}
            >
              Please enter the "Category".
            </p>
          )}
        </div>
        <div className={classes["inc-exp__add-amount"]}>
          <label htmlFor="expense-amount" />
          <input
            className={classes["inc-exp__add-input"]}
            type="number"
            name="expense-amount"
            id="expense-amount"
            placeholder="$1,234"
            min="1"
            max="99999"
            ref={expenseAmount}
          />
          {showErrorFields && !validity.amountIsValid && (
            <p
              className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-item"]}`}
            >
              Please enter the "Amount".
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default AddExpense;
