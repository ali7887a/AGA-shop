import React from "react";
import { Button , Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <div>
        <Button as={Link} to="/">Back to buy</Button>
      <p className="empty" style={{ fontSize: "xLarger" }}>
        your card is empty!
      </p>
      <Image fluid={true} className="empty" src={require("./EmptyCart.jpg")} alt="Empty" />
    </div>
  );
};

export default Empty;
