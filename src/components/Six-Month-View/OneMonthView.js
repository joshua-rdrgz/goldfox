import React from "react";

import NumberWrapper from "../utilities/NumberWrapper";

function OneMonthView() {
  return (
    <div className="6-monthview__item">
      <h5 className="6-monthview__title">This month</h5>
      <NumberWrapper className="6-monthview__amount">$4,248</NumberWrapper>
      <p className="6-monthview__comparison">$234 higher</p>
    </div>
  );
}

export default OneMonthView;
