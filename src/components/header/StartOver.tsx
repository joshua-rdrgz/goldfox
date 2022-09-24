import React from "react";

import classes from "../../styles/layout/header/startover.module.scss";

const StartOver = () => {
  return (
    <>
      <button className={`${classes.btn} ${classes[`btn--start-over`]}`}>
        Start Over
      </button>
    </>
  );
};

export default StartOver;
