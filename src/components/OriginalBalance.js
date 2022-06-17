import React from "react";

import classes from "../styles/layout/OriginalBalance.module.scss";

function OriginalBalance() {
  return (
    <section className={classes.originalBalance}>
      <label htmlFor="original-balance">
        <h2 className={classes.originalBalance__title}>Original Balance</h2>
      </label>
      <input
        className={classes.originalBalance__input}
        type="text"
        name="original-balance"
        id="original-balance"
        placeholder="$1,234"
        size="10"
      />
      <span className={classes.originalBalance__prevNumber}>
        Beginning Amount: $1,234
      </span>
    </section>
  );
}

export default OriginalBalance;
