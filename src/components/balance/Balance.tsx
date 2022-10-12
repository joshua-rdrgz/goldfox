import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { calculationsActions } from "../../store/reducers/calculationsReducer";

import classes from "../../styles/layout/balance/balance.module.scss";

const Balance = () => {
  const dispatch = useAppDispatch();
  const balanceInputRef = useRef<HTMLInputElement | null>(null);
  const [balance, setBalance] = useState(0);
  const [calcBtnPressed, setCalcBtnPressed] = useState(false);
  const budget = useAppSelector((state) => state.budget);
  const calculations = useAppSelector(state => state.calculations);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceValue = balanceInputRef?.current?.value
      ? +balanceInputRef.current.value
      : 0;
    balanceInputRef!.current!.blur();
    setBalance(balanceValue);
    setCalcBtnPressed(true);
  };

  useEffect(() => {
    if (calcBtnPressed) {
      const amounts = {
        income: budget.incomeItems.map((item) => +item.amount),
        expense: budget.expenseItems.map((item) => +item.amount),
      };
      dispatch(calculationsActions.setBalances(balance));
      dispatch(calculationsActions.gatherAmounts(amounts));
      dispatch(
        calculationsActions.calculateNetWorth({
          balance,
          amounts,
          howManyMonths: 6,
        })
      );
      setCalcBtnPressed(false);
    }
  }, [balance, budget, calcBtnPressed, dispatch]);

  return (
    <section className={classes.balance}>
      <form onSubmit={submitHandler} id="calculate-form">
        <label htmlFor="balance">
          <h2 className={classes.balance__title}>Net Worth:</h2>
        </label>
        <input
          className={classes.balance__input}
          type="number"
          name="balance"
          id="balance"
          data-testid="balance"
          placeholder="$1,234"
          min="0"
          max="99999"
          ref={balanceInputRef}
        />
      </form>
      <span className={classes.balance__prevNumber}>
        {`Current Net Worth Being Used: $${calculations.balance.toLocaleString()}`}
      </span>
      <button
        className={`${classes.btn} ${classes["btn--primary"]}`}
        type="submit"
        form="calculate-form"
      >
        Calculate Projections
      </button>
    </section>
  );
};

export default Balance;
