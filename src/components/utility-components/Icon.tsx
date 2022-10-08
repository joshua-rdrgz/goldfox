import React from "react";
import { IconType } from "react-icons/lib";

interface Icon {
  iconClassName?: string;
  buttonClassName?: string;
  onClick?: () => void;
  ariaLabel: string;
  icon: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
}

const Icon: React.FC<Icon> = (props) => {
  return (
    <button
      className={props.buttonClassName}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      type={props.type}
      form={props.form}
    >
      <props.icon className={props.iconClassName}/>
    </button>
  );
};

export default Icon;
