import React from "react";
import { IconType } from "react-icons/lib";

interface IconComponent {
  iconClassName?: string;
  buttonClassName?: string;
  onClick?: () => void;
  ariaLabel: string;
  icon: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
  id?: string;
}

const Icon: React.FC<IconComponent> = (props) => {
  return (
    <button
      data-testid={props.id}
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
