import React from "react";

interface Number {
  children: string;
}

const Number: React.FC<Number> = (props) => {
  return (
    <div>
      <span>{props.children}</span>
    </div>
  );
};

export default Number;
