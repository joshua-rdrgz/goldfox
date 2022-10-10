import { useReducer, useRef, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store-hooks";
import { budgetActions } from "../../store/reducers/budgetReducer";
import { useValidity } from "../../hooks/useValidity";
import { ValidityProps } from "../../hooks/useValidityTypes";
import Number from "../utility-components/Number";
import Icon from "../utility-components/Icon";
import {
  ItemType,
  ReducerState,
  ReducerAction,
} from "../../types/components/budget/itemTypes";
import { DeleteItem } from "../../types/store/reducers/budgetReducerTypes";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import classes from "../../styles/layout/budget/incexpitems.module.scss";
import errorClasses from "../../styles/layout/budget/incexperror.module.scss";

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

  const validityObject: ValidityProps = {
    ref: {
      item: itemEditRef,
      category: categoryEditRef,
      amount: amountEditRef,
    },
    type: "edit",
  };
  const { validity, updateValidity, resetValidity } =
    useValidity(validityObject);

  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null);

  const onClickEditHandler = () => {
    dispatchEditState({ type: "isEditing" });
  };

  const onClickDeleteHandler = ({ type, index }: DeleteItem) => {
    setItemToDelete({ type, index });
  };

  const changeHandler = (
    type: ReducerAction["type"],
    payload: ReducerAction["payload"]
  ) => {
    updateValidity(validityObject);
    dispatchEditState({ type, payload });
  };

  const submitHandler: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    if (validity.formIsValid) {
      dispatchEditState({ type: "isEditing" });
      resetValidity();
    }
  };

  useEffect(() => {
    if (itemToDelete) {
      dispatch(budgetActions.deleteItem(itemToDelete));
      setItemToDelete(null);
    }
  }, [itemToDelete, dispatch]);

  useEffect(() => {
    if (validity.formIsValid) {
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
    }
  }, [editState, validity, dispatch, item.type, itemIndex]);

  if (editState.isEditing) {
    return (
      <>
        {!validity.formIsValid && (
          <p
            className={`${errorClasses["inc-exp__error"]} ${errorClasses["inc-exp__error-form"]}`}
          >
            Please enter the following fields:
          </p>
        )}
        <form
          className={classes["inc-exp__item"]}
          onSubmit={submitHandler}
          id={`edit-${item.type}-${itemIndex + 1}`}
        >
          <div>
            <label htmlFor={`${item.type}-item-${itemIndex + 1}`} />
            <input
              value={editState.edited.item}
              onChange={() => {
                changeHandler("item", itemEditRef.current?.value);
              }}
              id={`${item.type}-item-${itemIndex + 1}`}
              ref={itemEditRef}
            />
            {!validity.formIsValid && !validity.itemIsValid && (
              <p
                className={`${errorClasses["inc-exp__error"]} ${errorClasses["inc-exp__error-item"]}`}
              >
                Please enter an item.
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${item.type}-category-${itemIndex + 1}`} />
            <input
              value={editState.edited.category}
              onChange={() => {
                changeHandler("category", categoryEditRef.current?.value);
              }}
              id={`${item.type}-category-${itemIndex + 1}`}
              ref={categoryEditRef}
            />
            {!validity.formIsValid && !validity.categoryIsValid && (
              <p
                className={`${errorClasses["inc-exp__error"]} ${errorClasses["inc-exp__error-item"]}`}
              >
                Please enter a category.
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${item.type}-amount-${itemIndex + 1}`} />
            <input
              value={editState.edited.amount}
              onChange={() => {
                changeHandler("amount", amountEditRef.current?.value);
              }}
              id={`${item.type}-amount-${itemIndex + 1}`}
              ref={amountEditRef}
            />
            {!validity.formIsValid && !validity.amountIsValid && (
              <p
                className={`${errorClasses["inc-exp__error"]} ${errorClasses["inc-exp__error-item"]}`}
              >
                Please enter a valid amount.
              </p>
            )}
          </div>
          <Icon
            icon={FaEdit}
            id={`edit-button-${itemIndex + 1}`}
            iconClassName={classes["inc-exp__icon"]}
            buttonClassName={classes["icon-btn"]}
            ariaLabel="edit-item"
            type="submit"
            form={`edit-${item.type}-${itemIndex + 1}`}
          />
          <Icon
            icon={AiFillDelete}
            id={`delete-button-${itemIndex + 1}`}
            iconClassName={classes["inc-exp__icon"]}
            buttonClassName={classes["icon-btn"]}
            ariaLabel="delete-item"
            type="button"
            onClick={() =>
              onClickDeleteHandler({ type: item.type, index: itemIndex })
            }
          />
        </form>
      </>
    );
  } else {
    return (
      <div className={classes["inc-exp__item"]}>
        <h5 className={classes["inc-exp__title"]}>{item.item}</h5>
        <p className={classes["inc-exp__category"]}>{item.category}</p>
        <Number className={classes["inc-exp__amount"]}>
          {`$${(+item.amount).toLocaleString()}`}
        </Number>
        <Icon
          icon={FaEdit}
          id={`edit-button-${itemIndex + 1}`}
          iconClassName={classes["inc-exp__icon"]}
          buttonClassName={classes["icon-btn"]}
          ariaLabel="edit-item"
          onClick={onClickEditHandler}
          type="button"
        />
        <Icon
          icon={AiFillDelete}
          id={`delete-button-${itemIndex + 1}`}
          iconClassName={classes["inc-exp__icon"]}
          buttonClassName={classes["icon-btn"]}
          ariaLabel="delete-item"
          type="button"
          onClick={() =>
            onClickDeleteHandler({ type: item.type, index: itemIndex })
          }
        />
      </div>
    );
  }
};

export default Item;
