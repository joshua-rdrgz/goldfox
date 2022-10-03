import { useReducer, useRef, useEffect } from "react";
import { useAppDispatch } from "../../store/store-hooks";
import { budgetActions } from "../../store/reducers/budgetReducer";
import Number from "../utility-components/Number";
import {
  ItemType,
  ReducerState,
  ReducerAction,
} from "../../types/components/budget/itemTypes";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import classes from "../../styles/layout/budget/incexpitems.module.scss";

const reducer = (state: ReducerState, action: ReducerAction) => {
  const returnStatement = (dispatchType: string) => {
    return {
      isEditing: true,
      edited: { ...state.edited, [dispatchType]: action.payload },
    };
  };
  switch (action.type) {
    case "item":
      return returnStatement("item");
    case "category":
      return returnStatement("category");
    case "amount":
      return returnStatement("amount");
    case "isEditing":
      return { isEditing: !state.isEditing, edited: { ...state.edited } };
  }
};

const Item = ({ item, itemIndex }: ItemType) => {
  const dispatch = useAppDispatch();

  const initialState: ReducerState = {
    isEditing: false,
    edited: {
      item: item.item,
      category: item.category,
      amount: item.amount,
    },
  };
  const [editState, dispatchEditState] = useReducer(reducer, initialState);

  const itemEditRef = useRef<HTMLInputElement | null>(null);
  const categoryEditRef = useRef<HTMLInputElement | null>(null);
  const amountEditRef = useRef<HTMLInputElement | null>(null);

  const onClickHandler = () => {
    dispatchEditState({ type: "isEditing" });
  };

  const onChangeHandler = (
    type: ReducerAction["type"],
    payload: ReducerAction["payload"]
  ) => {
    dispatchEditState({ type: type, payload: payload });
  };

  const onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void = (
    e
  ) => {
    e.preventDefault();
    dispatchEditState({ type: "isEditing" });
  };

  useEffect(() => {
    dispatch(
      budgetActions.editItem({
        type: item.type,
        index: itemIndex,
        changeTo: {
          type: item.type,
          item: editState.edited.item,
          category: editState.edited.category,
          amount: editState.edited.amount,
        },
      })
    );
  }, [editState]);

  if (editState.isEditing) {
    return (
      <form
        className={classes["inc-exp__item"]}
        onSubmit={onSubmitHandler}
        id={`edit-${item.type}-${itemIndex + 1}`}
      >
        <input
          value={editState.edited.item}
          onChange={() => {
            onChangeHandler("item", itemEditRef.current?.value);
          }}
          ref={itemEditRef}
        />
        <input
          value={editState.edited.category}
          onChange={() => {
            onChangeHandler("category", categoryEditRef.current?.value);
          }}
          ref={categoryEditRef}
        />
        <input
          value={editState.edited.amount}
          onChange={() => {
            onChangeHandler("amount", amountEditRef.current?.value);
          }}
          ref={amountEditRef}
        />
        <button type="submit" form={`edit-${item.type}-${itemIndex + 1}`}>
          <FaEdit className={classes["inc-exp__icon"]} />
        </button>

        <AiFillDelete className={classes["inc-exp__icon"]} />
      </form>
    );
  } else {
    return (
      <div className={classes["inc-exp__item"]}>
        <h5 className={classes["inc-exp__title"]}>{item.item}</h5>
        <p className={classes["inc-exp__category"]}>{item.category}</p>
        <Number className={classes["inc-exp__amount"]}>
          {`$${item.amount}`}
        </Number>
        <FaEdit className={classes["inc-exp__icon"]} onClick={onClickHandler} />
        <AiFillDelete className={classes["inc-exp__icon"]} />
      </div>
    );
  }
};

export default Item;
