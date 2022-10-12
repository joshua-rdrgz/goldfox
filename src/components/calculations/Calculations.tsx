import React from "react";
import { useAppSelector } from "../../store/store-hooks";
import Month from "./Month";
import classes from "../../styles/layout/calculations/calculations.module.scss";

const Calculations = () => {
  const calculations = useAppSelector((state) => state.calculations);
  return (
    <>
      {calculations.results.length === 0 && (
        <section className={classes.networth}>
          <div className={classes.networth__monthContainer}>
            <h4 className={classes.networth__noBalance}>Please enter your information!</h4>
          </div>
        </section>
      )}
      {calculations.results.length > 0 && (
        <section className={classes.networth}>
          <h4 className={classes.networth__caption}>Using your incomes and expenses, at the end of...</h4>
          <div className={classes.networth__monthContainer}>
            {calculations.results.map((result) => {
              return (
                <Month
                  key={result.month}
                  month={result.month}
                  netWorth={result.netWorth}
                  difference={result.difference}
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Calculations;
