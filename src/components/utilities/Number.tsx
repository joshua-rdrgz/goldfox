import React from "react";

interface Number {
  children: string;
  className?: string;
}

const Number: React.FC<Number> = (props) => {
  return (
    <div className={props.className}>
      <span>{props.children}</span>
    </div>
  );
};

export default Number;
