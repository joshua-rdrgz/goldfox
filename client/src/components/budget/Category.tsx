import React from "react";

import Items from "./Items";
import AddItem from "./AddItem";

import { Props } from "../../types/components/budget/budgetTypes";

import capitalized from "../helper-functions/capitalized";

import classes from "../../styles/layout/budget/incexp.module.scss";

const Category: React.FC<Props> = ({ type }) => {
  return (
    <section className={classes["inc-exp"]}>
      <h4 className={classes["inc-exp__section-title"]}>{capitalized(type)}s per month...</h4>
      <div className={classes["inc-exp__content"]}>
        <Items type={type} />
        <AddItem type={type} />
      </div>
      <button
        className={`${classes.btn} ${classes["btn--add"]}`}
        type="submit"
        form={`add-${type}`}
      >
        Add {capitalized(type)}
      </button>
    </section>
  );
};

export default Category;
