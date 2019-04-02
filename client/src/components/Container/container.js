import React from "react";

function Container(props) {
  return <div className="container rounded">{props.children}</div>;
}

export default Container;
