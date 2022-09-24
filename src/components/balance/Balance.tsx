import React from "react";

const Balance = () => {
  return (
    <section>
      <label htmlFor="balance">
        <h2>Balance:</h2>
      </label>
      <input type="number" name="balance" id="balance" placeholder="$1,234" />
      <span>Previous Amount: $1,234</span>
      <button>Calculate</button>
    </section>
  );
};

export default Balance;
