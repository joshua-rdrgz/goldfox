import React from "react";

function NumberWrapper(props) {
  return (
    <div className={`${props.className}-wrapper`}>
      <span className={props.className}>{props.children}</span>
    </div>
  )
}

export default NumberWrapper;
