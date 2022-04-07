import React from "react";
import {  useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
const SuccessBuy = () => {
  //order that has been success
  const { OrderDone, Loading, error } = useSelector((e) => e.Order);
  const date = new Date(OrderDone&&OrderDone.createdAt);
  const navigate = useNavigate()
  return (
    <>
      {Loading ? (
        <ReactLoading
          type="bubbles"
          color="#F1B814"
          height={150}
          width={100}
          className="Loading"
        />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button className="Stepper" variant="danger" disabled>
              Info
            </Button>
            <Button className="Stepper" variant="danger" disabled>
              Factor
            </Button>
            <Button className="StepperSuccess" variant="success">
              Success Buy
            </Button>
          </div>
          {!error&&
          <p>
            <Alert style={{ marginTop: "5%" }} variant="success">
              <Alert.Heading>
                Dear {localStorage.getItem("name")}!
              </Alert.Heading>
              <p>
                Your purchase with tracking number {OrderDone&&OrderDone._id} And was successfully
                registered at {date.getHours()}:{date.getMinutes()} on {date.getDay()}/{date.getMonth()}/{date.getFullYear()}.
              </p>
              <hr />
              <p className="mb-0">
              You can see your past purchases in the Purchase History section.
              </p>
              <Button
              
              onClick={()=>navigate('/')}
              >Back to Home</Button>
            </Alert>
          </p>}
          {error&&
          <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Something went wrong check your Internet and call to developer
          </p>
        </Alert>
          }
        </>
      )}
    </>
  );
};

export default SuccessBuy;
