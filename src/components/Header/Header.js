import React from "react";

import classes from '../../styles/layout/Header/Header.module.scss';

import StartOver from "./StartOver";

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__logo}>GoldFox</h1>
      <StartOver />
    </header>
  );
}

export default Header;
