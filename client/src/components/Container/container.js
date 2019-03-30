import React from "react";

function Container(props) {
  return <div className="hero-body">
  <div className="container height">{props.children}</div>
</div>;
}

export default Container;
