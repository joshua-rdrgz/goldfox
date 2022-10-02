import React from "react";
import { useAppSelector } from "../../../store/store-hooks";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import Number from "../../utilities/Number";

import classes from "../../../styles/layout/budget/incexpitems.module.scss";

const ExpenseItems = () => {
  const expenseItems = useAppSelector((state) => state.budget.expenseItems);

  return (
    <div className={classes["inc-exp__container"]}>
      {expenseItems.length === 0 && (
        <p className={classes["inc-exp__empty-container"]}>
          Please Enter An Expense Item!
        </p>
      )}
      {expenseItems.map((item, itemIndex) => {
        return (
          <div
            className={classes["inc-exp__item"]}
            key={`income-item-${itemIndex + 1}`}
          >
            <h5 className={classes["inc-exp__title"]}>{item.item}</h5>
            <p className={classes["inc-exp__category"]}>{item.category}</p>
            <Number className={classes["inc-exp__amount"]}>
              {`$${item.amount}`}
            </Number>
            <FaEdit className={classes["inc-exp__icon"]} />
            <AiFillDelete className={classes["inc-exp__icon"]} />
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseItems;
