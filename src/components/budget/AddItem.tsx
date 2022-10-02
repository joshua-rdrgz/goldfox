import React, { useRef, useEffect } from "react";
import { useValidity } from "../../hooks/useValidity";

import { useAppDispatch } from "../../store/store-hooks";
import { budgetActions } from "../../store/reducers/budgetReducer";

import { Props } from "../../types/components/budget/budgetTypes";

import classes from "../../styles/layout/budget/addincexp.module.scss";

const AddItem: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();

  const item = useRef<HTMLInputElement | null>(null);
  const category = useRef<HTMLInputElement | null>(null);
  const amount = useRef<HTMLInputElement | null>(null);

  const validityObject = {
    item,
    category,
    amount,
  };

  const { validity, updateValidity, resetValidity } =
    useValidity(validityObject);

  const showErrorFields =
    validity.formIsTouched && !validity.formIsValid;

  useEffect(() => {
    const enteredItem = item.current!.value;
    const enteredCategory = category.current!.value;
    const enteredAmount = amount.current!.value;

    if (validity.formIsValid) {
      dispatch(
        budgetActions.addItem({
          type: type,
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
        id={`add-${type}`}
      >
        <div>
          <label htmlFor={`${type}-item`} />
          <input
            className={classes["inc-exp__add-input"]}
            type="text"
            name={`${type}-item`}
            id={`${type}-item`}
            placeholder="Item"
            ref={item}
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
          <label htmlFor={`${type}-category`} />
          <input
            className={`${classes["inc-exp__add-input"]} ${classes["inc-exp__add-category"]}`}
            type="text"
            name={`${type}-category`}
            id={`${type}-category`}
            placeholder="Category..."
            ref={category}
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
          <label htmlFor={`${type}-amount`} />
          <input
            className={classes["inc-exp__add-input"]}
            type="number"
            name={`${type}-amount`}
            id={`${type}-amount`}
            placeholder="$1,234"
            min="1"
            max="99999"
            ref={amount}
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

export default AddItem;
