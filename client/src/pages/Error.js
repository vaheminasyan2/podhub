import React from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";


const textStyle = {
  left: "25%",
  right: "25%",
  width: "50%",
  position: "relative",
};

function Error() {
  return (
    <div>
      <Container>
        <Row>
          <h1 className="text-center" style={textStyle}>
            404 Page Not Found
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
              </span>
          </h1>
        </Row>
      </Container>
    </div>
  );
}

export default Error;
