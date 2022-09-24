import React from "react";

import Month from "./Month";

import classes from "../../styles/layout/calculations/calculations.module.scss";

const Calculations = () => {
  return (
    <section className={classes.networth}>
      <h4 className={classes.networth__caption}>At the end of...</h4>
      <div className={classes.networth__monthContainer}>
        <Month />
        <Month />
        <Month />
        <Month />
        <Month />
        <Month />
      </div>
    </section>
  );
};

export default Calculations;
