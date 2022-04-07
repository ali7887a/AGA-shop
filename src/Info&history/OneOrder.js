import React, { useEffect } from "react";
import { Button , ListGroupItem , ListGroup, Card } from "react-bootstrap";
import { MdOutlineArrowBackIosNew, MdOutlinePayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActionOneOrders } from "../action";
import ReactLoading from "react-loading";
import { IoIosHome } from "react-icons/io";
import { SiMinutemailer } from "react-icons/si";
import { FaAddressCard } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { BsBagCheck, BsFilePost, BsTruck } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
function OneOrder() {
  const { orderID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActionOneOrders(orderID));
  }, [orderID]);
  const { OneOrders, Loading, error } = useSelector((e) => e.OneOrder);
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <p>
              {OneOrders&&OneOrders.orderItems.map((item, index) => (
                <ListGroup key={index}>
                  <ListGroup.Item style={{ display: "flex", border: "none" }}>
                    <span>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        alt="salePic"
                        src={require(`../Home${item.image}`)}
                      />
                    </span>
                    <div>
                      <p style={{ color: "#490B3D" }}>{item.name}</p>
                      <p style={{ color: "#F1B814" }}>
                        Number: {item.qty}
                      </p>
                      <p style={{ color: "#490B3D" }}>
                        price:
                        {item.price}$
                      </p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </p>
            <p>
              <Card className="sellerCard">
                <Card.Body style={{ backgroundColor: "#F1B814" }}>
                  <Card.Title>
                    Send to : {OneOrders&&OneOrders.user.name}
                  </Card.Title>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <SiMinutemailer style={{ fontSize: "130%" }} /> Email :{" "}
                    {OneOrders&&OneOrders.user.email}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <IoIosHome style={{ fontSize: "130%" }} /> City :{" "}
                    {OneOrders&&OneOrders.shippingAddress.city}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <FaAddressCard style={{ fontSize: "130%" }} /> Address:{" "}
                    {OneOrders&&OneOrders.shippingAddress.address}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <ImPhone style={{ fontSize: "130%" }} /> Phone:{" "}
                    {OneOrders&&OneOrders.shippingAddress.phone}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <BsFilePost style={{ fontSize: "130%" }} /> PostalCode:{" "}
                    {OneOrders&&OneOrders.shippingAddress.postalCode}
                  </Card.Text>
                </Card.Body>
              </Card>
            </p>
            <p>
              <Card className="sellerCard">
                <Card.Body>
                  <Card.Title>Details:</Card.Title>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <BiHomeSmile style={{ fontSize: "130%" }} /> AGA Online Shop
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <MdOutlinePayment style={{ fontSize: "130%" }} /> {OneOrders&&OneOrders.isPaid?<span style={{color:"green"}}>"Paid SuccessFully"</span>:<span style={{color:"red"}}>Not Paid</span>}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <BsBagCheck style={{ fontSize: "130%" }} /> {OneOrders&&OneOrders.paymentMethod}
                  </Card.Text>
                  <Card.Text style={{ fontFamily: "Medium" }}>
                    <BsTruck style={{ fontSize: "130%" }} /> {OneOrders&&OneOrders.isDelivered?<span style={{color:"green"}}>"Delivered SuccessFully"</span>:<span style={{color:"red"}}>Not Delivered</span>}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <>
                    <ListGroupItem style={{ color: "#490B3D" }}>
                      transport cost:
                      {OneOrders&&OneOrders.shippingPrice===0 ? <span style={{color:"green"}}>Free</span>:<span>15$</span>}
                    </ListGroupItem>
                    <ListGroupItem>
                      {" "}
                      Total Price: {"  "}
                      <Button
                        variant="danger"
                        style={{ backgroundColor: "#490B3D", border: "none" }}
                      >
                        {" "}
                        {OneOrders&&OneOrders.totalPrice}
                      </Button>
                    </ListGroupItem>
                    <ListGroupItem style={{ color: "#490B3D" }}>
                      {" "}
                      Buy At: <span>
                      {new Date(OneOrders&&OneOrders.createdAt).getDay()}/
                      {new Date(OneOrders&&OneOrders.createdAt).getMonth()}/
                      {new Date(OneOrders&&OneOrders.createdAt).getFullYear()}
                      </span>
                    </ListGroupItem>
                  </>
                </ListGroup>
              </Card>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default OneOrder;
