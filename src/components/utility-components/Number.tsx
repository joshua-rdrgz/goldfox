import React from "react";

interface NumberComponent {
  children: string | undefined;
  className?: string;
}

const Number: React.FC<NumberComponent> = (props) => {
  return (
    <div className={props.className}>
      <span>{props.children}</span>
    </div>
  );
};

export default Number;
