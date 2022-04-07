import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsBagCheck, BsTruck } from "react-icons/bs";
import { BiHomeSmile, BiCheckShield, BiWinkSmile } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ActionCounter, ActionProducts, ActionRefresh } from "../action";
import ReactLoading from "react-loading";
import Empty from "./empty";
const SaleCard = () => {
  const dispatch = useDispatch();
  const { Products, Loading } = useSelector((e) => e.AllProducts);
  var AllTheNames = [];
  Products.map((e) => {
    AllTheNames.push(e.name);
  });
  var myArray = [];
  for (var i = 0; i < Object.entries(localStorage).length; i++) {
    myArray.push(Object.entries(localStorage)[i][0]);
  }
  const BoughtItem = [];
  AllTheNames.forEach((item) => {
    myArray.map((e) => {
      if (item === e) {
        BoughtItem.push(item);
      }
    });
  });
  useEffect(() => {
    dispatch(ActionProducts());
  }, []);
  // put all the keys in localstorage to the newArray
  const newArray = [];
  for (let [key] of Object.entries(localStorage)) {
    newArray.push(key);
  }
  //put all the names in Products to the newArray2
  const newArray2 = [];
  Products.map((item) => {
    newArray2.push(item.name);
  });
  //compare to match items/item between newArray and newArray2
  const intersection = newArray2.filter((element) =>
    newArray.includes(element)
  );
  //get the index of matches items from Products
  const indexes = [];
  for (var i = 0; i < intersection.length; i++) {
    indexes.unshift(
      Products.findIndex((item) => item.name === intersection[i])
    );
  }
  //for sum all the prices of products
  const list = [];
  for (let [key, value] of Object.entries(localStorage)) {
    list.push(`${key}`);
  }
  var num = [];
  indexes.map((item) => {
    list.map((a) => {
      Products[item].name === a &&
        num.push(
          Products[item].price * localStorage.getItem(Products[item].name)
        );
    });
  });
  let sum = 0;
  num.forEach(myFunction);
  function myFunction(item) {
    sum += item;
  }
  // to count all the products
  const counting = [];
  indexes.map((item) => {
    counting.push(+localStorage.getItem(Products[item].name));
  });
  let sumCount = 0;
  counting.forEach((e) => {
    sumCount += e;
  });
  // all the condition for counter
  const refresh = useSelector((e) => e.Refresh);
  const [Re, setRe] = useState(false);
  useEffect(() => {
    refresh === true ? setRe(true) : setRe(false);
  }, [refresh]);
  const navigate = useNavigate();
  return (
    <div>
      {BoughtItem.length >= 1 ? (
        <>
          <Button
            className="back"
            variant="danger"
            onClick={() => navigate(-1)}
          >
            {" "}
            <MdOutlineArrowBackIosNew /> Back
          </Button>
          {Loading ? (
            <ReactLoading
              type="bubbles"
              color="#F1B814"
              height={150}
              width={100}
              className="Loading"
            />
          ) : (
            <div className="cardSale">
              <p>
                {indexes.map((item, index) => (
                  <ListGroup key={index}>
                    <ListGroup.Item style={{ display: "flex" }}>
                      <span>
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          alt="salePic"
                          src={require(`../Home${Products[item].image}`)}
                        />
                      </span>
                      <div>
                        <p style={{ color: "#490B3D" }}>
                          {Products[item].name}
                        </p>
                        <p style={{ color: "#F1B814" }}>
                          Unit price:{Products[item].price}$
                        </p>
                        <p style={{ color: "#490B3D" }}>
                          Total price:
                          {localStorage.getItem(Products[item].name) *
                            Products[item].price}
                          $
                        </p>
                      </div>
                      <div style={{ marginLeft: "auto", placeSelf: "center" }}>
                        <>
                          <div className="count">
                            {localStorage.getItem(Products[item].name) <= 1 ? (
                              <Button
                                variant="outline-danger"
                                style={{ border: "none" }}
                                onClick={() => {
                                  localStorage.removeItem(Products[item].name);
                                  dispatch(ActionCounter(-1));
                                  dispatch(ActionRefresh(false));
                                }}
                              >
                                <RiDeleteBin5Fill
                                  style={{ fontSize: "120%", border: "none" }}
                                />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  localStorage.setItem(
                                    Products[item].name,
                                    +localStorage.getItem(Products[item].name) -
                                      1
                                  );
                                  dispatch(ActionRefresh(false));
                                }}
                                style={{ fontSize: "150%", border: "none" }}
                                variant="outline-danger"
                              >
                                -
                              </Button>
                            )}{" "}
                            <span style={{ fontSize: "150%", margin: "auto" }}>
                              {localStorage.getItem(Products[item].name)}
                            </span>
                            <Button
                              onClick={() => {
                                localStorage.setItem(
                                  Products[item].name,
                                  +localStorage.getItem(Products[item].name) + 1
                                );
                                dispatch(ActionRefresh(false));
                              }}
                              variant="outline-success"
                              style={{ fontSize: "150%", border: "none" }}
                              disabled={
                                localStorage.getItem(Products[item].name) >=
                                Products[item].countInStock
                              }
                            >
                              +
                            </Button>
                          </div>
                          {localStorage.getItem(Products[item].name) >=
                            Products[item].countInStock && (
                            <p
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                color: "red",
                              }}
                            >
                              Buy All <BiWinkSmile />
                            </p>
                          )}
                        </>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </p>
              <p>
                <Card className="sellerCard">
                  <Card.Body>
                    <Card.Title>Seller:</Card.Title>
                    <Card.Text style={{ fontFamily: "Medium" }}>
                      <BiHomeSmile style={{ fontSize: "130%" }} /> AGA Online
                      Shop
                    </Card.Text>
                    <Card.Text style={{ fontFamily: "Medium" }}>
                      <BiCheckShield style={{ fontSize: "130%" }} /> 7 days
                      money back guarantee
                    </Card.Text>
                    <Card.Text style={{ fontFamily: "Medium" }}>
                      <BsBagCheck style={{ fontSize: "130%" }} /> Available in
                      AGA Store{" "}
                    </Card.Text>
                    <Card.Text style={{ fontFamily: "Medium" }}>
                      <BsTruck style={{ fontSize: "130%" }} /> Posted by AGA
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <>
                      <ListGroupItem>
                        {" "}
                        Total Price: {"  "}
                        <Button
                          variant="danger"
                          style={{ backgroundColor: "#490B3D", border: "none" }}
                        >
                          {" "}
                          {sum}$
                        </Button>
                      </ListGroupItem>
                      <ListGroupItem style={{ color: "#490B3D" }}>
                        {" "}
                        Total items in cart: {sumCount}
                      </ListGroupItem>
                    </>
                    <Button variant="success" style={{ border: "none" }} as={Link} to="/address">
                      Continue to buy <FaShopify />
                    </Button>
                  </ListGroup>
                </Card>
              </p>
            </div>
          )}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default SaleCard;
