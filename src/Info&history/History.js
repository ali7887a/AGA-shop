import React, { useEffect } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ActionAllOrders } from "../action";
import ReactLoading from "react-loading";
function History() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { AllOrders, Loading, error } = useSelector((e) => e.AllOrders);
  useEffect(() => {
    dispatch(ActionAllOrders());
  }, [dispatch]);
  // prevent user to access this page without token
  var token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [navigate, token]);
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
          <p>
            <Button
              className="back"
              variant="danger"
              onClick={() => navigate(-1)}
            >
              <MdOutlineArrowBackIosNew />
              back
            </Button>
          </p>
          {/* when History is empty */}
          {AllOrders && !AllOrders.length && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p style={{ marginRight: "auto", marginLeft: "auto" }}>
                you don't have any purches
              </p>
              <Image
                fluid={true}
                className="empty"
                src={require("./Picture1.png")}
                alt="Empty"
              />
            </div>
          )}
          {AllOrders && AllOrders.length > 0 && (
            <>
              {AllOrders.map((item, index) => (
                <div key={index}>
                  <Card className="text-center">
                    <Card.Footer
                      style={{ backgroundColor: "#f1ba14a1", color: "#490B3D" }}
                    >
                      id: {item._id}
                    </Card.Footer>
                    <Card.Body
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                      }}
                    >
                      {item.orderItems.map((e, indx) => (
                        <div key={indx}>
                          <Card style={{ width: "12rem" }}>
                            <Card.Img
                              variant="top"
                              src={require(`../Home${e.image}`)}
                            />
                            <Card.Body>
                              <Card.Title style={{ color: "#490B3D" }}>
                                {e.name}
                              </Card.Title>
                              <Card.Title style={{ color: "#490B3D" }}>
                                {e.price}$
                              </Card.Title>
                              <Card.Text>Number: {e.qty}</Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </Card.Body>
                    <Button variant="warning" style={{maxWidth:"fit-content" , marginRight:"auto" , marginLeft:"auto" , marginBottom:"1%"}} as={Link} to={String(item._id)}>Details</Button>
                    <Card.Footer
                      style={{ backgroundColor: "#f1ba14a1", color: "#490B3D" }}
                    >
                      Total Price: {item.totalPrice}$
                    </Card.Footer>
                    <Card.Footer
                      style={{ backgroundColor: "#f1ba14a1" }}
                      className="text-muted"
                    >
                      {new Date(item.createdAt).getDay()}/
                      {new Date(item.createdAt).getMonth()}/
                      {new Date(item.createdAt).getFullYear()}
                    </Card.Footer>
                  </Card>
                  <p></p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
export default History;
