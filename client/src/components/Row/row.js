import React from "react";

function Row(props) {
  return <div className="columns is-mobile">{props.children}</div>;
}

export default Row;
