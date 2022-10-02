import React from "react";
import { useAppSelector } from "../../store/store-hooks";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import { Props } from "../../types/components/budget/budgetTypes";

import Number from "../utility-components/Number";

import capitalized from "../helper-functions/capitalized";

import classes from "../../styles/layout/budget/incexpitems.module.scss";

const Items: React.FC<Props> = ({ type }) => {
  const items = useAppSelector((state) => state.budget[`${type}Items`]);

  return (
    <div className={classes["inc-exp__container"]}>
      {items.length === 0 && (
        <p className={classes["inc-exp__empty-container"]}>
          Please Enter An {capitalized(type)} Item!
        </p>
      )}
      {items.map((item, itemIndex) => {
        return (
          <div
            className={classes["inc-exp__item"]}
            key={`${type}-item-${itemIndex + 1}`}
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

export default Items;
