import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/store-hooks";
import { budgetActions } from "../../store/reducers/budgetReducer";
import { calculationsActions } from "../../store/reducers/calculationsReducer";
import classes from "../../styles/layout/header/startover.module.scss";

const StartOver = () => {
  const dispatch = useAppDispatch();
  const [startOver, setStartOver] = useState(false);

  const startOverHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setStartOver(true);
  };

  useEffect(() => {
    if (startOver) {
      dispatch(budgetActions.resetBudget());
      dispatch(calculationsActions.resetCalculations());
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setStartOver(false);
    }
  }, [startOver, dispatch]);

  return (
    <>
      <button
        className={`${classes.btn} ${classes[`btn--start-over`]}`}
        onClick={startOverHandler}
      >
        Start Over
      </button>
    </>
  );
};

export default StartOver;
