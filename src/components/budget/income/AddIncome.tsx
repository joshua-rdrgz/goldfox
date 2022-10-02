import React, { useRef, useEffect } from "react";
import { useValidity } from "../../../hooks/useValidity";

import { useAppDispatch } from "../../../store/store-hooks";
import { budgetActions } from "../../../store/reducers/budgetReducer";

import classes from "../../../styles/layout/budget/addincexp.module.scss";

const AddIncome = () => {
  const dispatch = useAppDispatch();

  const incomeItem = useRef<HTMLInputElement | null>(null);
  const incomeCategory = useRef<HTMLInputElement | null>(null);
  const incomeAmount = useRef<HTMLInputElement | null>(null);

  const validityObject = {
    item: incomeItem,
    category: incomeCategory,
    amount: incomeAmount,
  };

  const { validity, updateValidity, resetValidity } =
    useValidity(validityObject);

  const showErrorFields = validity.formIsTouched && !validity.formIsValid;

  useEffect(() => {
    const enteredItem = incomeItem.current!.value;
    const enteredCategory = incomeCategory.current!.value;
    const enteredAmount = incomeAmount.current!.value;

    if (validity.formIsValid) {
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
            <p
              className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-item"]}`}
            >
              Please enter the "Item".
            </p>
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
            <p
              className={`${classes["inc-exp__error"]} ${classes["inc-exp__error-item"]}`}
            >
              Please enter the "Category".
            </p>
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

export default AddIncome;
