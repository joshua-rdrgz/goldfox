import React from "react";
import { useAppSelector } from "../../../store/store-hooks";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import Number from "../../utilities/Number";

import classes from "../../../styles/layout/budget/incexpitems.module.scss";

const IncomeItems = () => {
  const incomeItems = useAppSelector((state) => state.budget.incomeItems);

  return (
    <div className={classes["inc-exp__container"]}>
      {incomeItems.length === 0 && (
        <h4>Please Enter An Income Item!</h4>
      )}
      {incomeItems.map((item, itemIndex) => {
        return (
          <div className={classes["inc-exp__item"]} key={`income-item-${itemIndex + 1}`}>
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

export default IncomeItems;
