import React from "react";
import { useAppSelector } from "../../store/store-hooks";
import { Props } from "../../types/components/budget/budgetTypes";
import Item from "./Item";
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
        return <Item item={item} itemIndex={itemIndex} key={`${type}-item-${itemIndex + 1}`}/>;
      })}
    </div>
  );
};

export default Items;
