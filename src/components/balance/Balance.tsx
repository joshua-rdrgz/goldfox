import React from "react";

import classes from "../../styles/layout/balance/balance.module.scss";

const Balance = () => {
  return (
    <section className={classes.balance}>
      <label htmlFor="balance">
        <h2 className={classes.balance__title}>Balance:</h2>
      </label>
      <input
        className={classes.balance__input}
        type="number"
        name="balance"
        id="balance"
        placeholder="$1,234"
      />
      <span className={classes.balance__prevNumber}>
        Previous Amount: $1,234
      </span>
      <button className={`${classes.btn} ${classes["btn--primary"]}`}>
        Calculate
      </button>
    </section>
  );
};

export default Balance;
