import React, { useEffect, useState } from "react";
import { Button, Card, ListGroupItem, ListGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaShopify, FaAddressCard } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { ImPhone } from "react-icons/im";
import { BsBagCheck, BsTruck, BsEmojiSmile, BsFilePost } from "react-icons/bs";
import { BiHomeSmile, BiCheckShield } from "react-icons/bi";
import { ActionCreateOrder } from "../action";

export const Factor = () => {
  const {error} = useSelector(e=>e.Order)
  const dispatch = useDispatch()
  // how to send
  const [Internet, setInternet] = useState(true);
  // prevent user to access this page without token
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [navigate, token]);
  //Get information of user
  const info = localStorage.getItem("info");
  const parseInfo = JSON.parse(info);
  //for show products item that you buy
  const { Products } = useSelector((e) => e.AllProducts);
  var AllTheNames = [];
  Products.map((e) => {
    AllTheNames.push(e.name);
  });
  var myArray = [];
  for (var i = 0; i < Object.entries(localStorage).length; i++) {
    myArray.push(Object.entries(localStorage)[i][0]);
  }
  // the items that you buy
  const BoughtItem = [];
  AllTheNames.forEach((item) => {
    myArray.map((e) => {
      if (item === e) {
        BoughtItem.push(item);
      }
    });
  });
  const all = [];
  Products.forEach((item) => {
    BoughtItem.map((e) => {
      if (item.name === e) {
        all.push(item);
      }
    });
  });
  //transport fee
  const transport = "15$";
  //for sum all the prices of products
  const list = [];
  for (let [key, value] of Object.entries(localStorage)) {
    list.push(`${key}`);
  }
  var num = [];
  all.map((item) => {
    list.map((a) => {
      item.name === a && num.push(item.price * localStorage.getItem(item.name));
    });
  });
  let sum = 0;
  num.forEach(myFunction);
  function myFunction(item) {
    sum += item;
  }

  // to count all the products
  const counting = [];
  all.map((item) => {
    counting.push(+localStorage.getItem(item.name));
  });
  let sumCount = 0;
  counting.forEach((e) => {
    sumCount += e;
  });
  // products that user want to buy ready to send api
  const orderItems = [];
  all.forEach((e) => {
    orderItems.push({
      product: e._id,
      name: e.name,
      image: e.image,
      price: e.price,
      countInStock: e.countInStock,
      qty: +localStorage.getItem(e.name),
    });
  });
  //all the information about address of user ready to send api
  const shippingAddress = {
    address: parseInfo[1].Address,
    city: parseInfo[0].City,
    postalCode: parseInfo[3].PostalCode,
    phone: parseInfo[2].Phone,
  };
  // the body ready to send api
  const order = {
    orderItems,
    shippingAddress,
    paymentMethod: Internet?"Internet":"Door By Door" ,
    itemsPrice: JSON.stringify(sum) ,
    shippingPrice: JSON.stringify(sum < 1000 ? 15 : 0),
    totalPrice: JSON.stringify(sum < 1000 ? sum + 15 : sum),
  };
  const BuyHandler = ()=>{
    navigate('/Success')
    dispatch(ActionCreateOrder(order))
    !error&&
    all.map(e=>{
      localStorage.removeItem(e.name)
    })   
    !error&&
    localStorage.removeItem('info')
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "5%",
        }}
      >
        <Button className="Stepper" variant="danger" as={Link} to="/address">
          Info
        </Button>
        <Button className="Stepper" variant="danger">
          Factor
        </Button>
        <Button className="StepperSuccess" variant="success" disabled>
          Success Buy
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <p>
          {all.map((item, index) => (
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
                    count: {localStorage.getItem(item.name)}
                  </p>
                  <p style={{ color: "#490B3D" }}>
                    Unit price:
                    {localStorage.getItem(item.name) * item.price}$
                  </p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </p>
        <p>
          <Card className="sellerCard">
            <Card.Body style={{ backgroundColor: "#F1B814" }}>
              <Card.Title>Send to : {localStorage.getItem("name")}</Card.Title>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <IoIosHome style={{ fontSize: "130%" }} /> City :{" "}
                {parseInfo[0].City}
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <FaAddressCard style={{ fontSize: "130%" }} /> Address:{" "}
                {parseInfo[1].Address}
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <ImPhone style={{ fontSize: "130%" }} /> Phone:{" "}
                {parseInfo[2].Phone}
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BsFilePost style={{ fontSize: "130%" }} /> PostalCode:{" "}
                {parseInfo[3].PostalCode}
              </Card.Text>
            </Card.Body>
          </Card>
        </p>
        <p>
          <Card className="sellerCard">
            <Card.Body>
              <Card.Title>Seller:</Card.Title>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BiHomeSmile style={{ fontSize: "130%" }} /> AGA Online Shop
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BiCheckShield style={{ fontSize: "130%" }} /> 7 days money back
                guarantee
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BsBagCheck style={{ fontSize: "130%" }} /> Available in AGA
                Store{" "}
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BsTruck style={{ fontSize: "130%" }} /> Free shipping on
                purchases over 1000$
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <>
                <ListGroupItem style={{ color: "#490B3D" }}>
                  {" "}
                  Total items in cart: {sumCount}
                </ListGroupItem>
                <ListGroupItem style={{ color: "#490B3D" }}>
                  transport cost:
                  {sum > 1000 ? (
                    <span style={{ color: "green" }}>
                      free
                      <BsEmojiSmile />
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>{transport}</span>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  {" "}
                  Total Price: {"  "}
                  <Button
                    variant="danger"
                    style={{ backgroundColor: "#490B3D", border: "none" }}
                  >
                    {" "}
                    {sum < 1000 ? sum + 15 : sum}$
                  </Button>
                </ListGroupItem>
                <ListGroupItem style={{ color: "#490B3D" }}>
                  {" "}
                  Payment By:
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch1"
                      label="Internet"
                      onChange={(e) => setInternet(e.target.checked)}
                      checked={Internet}
                    />
                    <Form.Check
                      type="switch"
                      label="door to door"
                      id="custom-switch2"
                      onChange={(e) => setInternet(!e)}
                      checked={!Internet}
                    />
                  </Form>
                </ListGroupItem>
              </>
              <Button
                variant="success"
                style={{ border: "none" }}
                onClick={BuyHandler}
              >
                Buy <FaShopify />
              </Button>
            </ListGroup>
          </Card>
        </p>
      </div>
    </>
  );
};
