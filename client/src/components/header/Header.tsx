import React from "react";

import StartOver from "./StartOver";

import classes from "../../styles/layout/header/header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__logo}>GoldFox</h1>
      <StartOver />
    </header>
  );
};

export default Header;
