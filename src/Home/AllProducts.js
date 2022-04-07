import React, { useEffect, useState } from "react";
import {
  Col,
  Card,
  ListGroup,
  Row,
  ListGroupItem,
  Button,
  Carousel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ActionProducts } from "../action";
import ReactLoading from "react-loading";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
const AllProducts = () => {
  const dispatch = useDispatch();
  const { Products, Loading } = useSelector((e) => e.AllProducts);
  useEffect(() => {
    dispatch(ActionProducts());
  }, [dispatch]);
  //the state for change desktop view to mobile view
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 993;
  const breakout = 600;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <>
      {/* carsoal for fake advertise */}
      <Col className="carsols">
        <Carousel className="carsoool" variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100 images"
              alt="slide"
              src={require("./images/advertise/Android ios Fitness Smartwatch _ Men's IP67 Waterproof Bluetooth Full Touch Screen Sport Watch - black _ SPAIN.jpg")}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 images"
              alt="slide"
              src={require("./images/advertise/Apple Designing New Clamshell Folding iPhone, Claims Leaker.jpg")}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 images"
              alt="slide"
              src={require("./images/advertise/cab18cd8f01ebffd145d2c80b575b2e4.jpg")}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 images"
              alt="slide"
              src={require("./images/advertise/laptop.jpg")}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 images"
              alt="slide"
              src={require("./images/advertise/✨script De Rico✨.jpg")}
            />
          </Carousel.Item>
        </Carousel>
        {/* dynamic Coursal */}
        <Carousel variant="dark">
          {Products.map((item, index) => (
            <Carousel.Item key={index} as={Link} to={String(item._id)}>
              <img
                className="d-block w-100 images"
                alt="slide"
                src={require(`.${item.image}`)}
              />
              <Carousel.Caption>
                {width < breakout ? (
                  <span> </span>
                ) : (
                  <span style={{ fontSize: "xLarge" }}>
                    <Button
                      variant="warning"
                      style={{
                        backgroundColor: "#F1B814",
                        textDecoration: "line-through", border:"none"
                      }}
                    >
                      {item.price}$
                    </Button>{" "}
                    <Button
                      variant="danger"
                      style={{ backgroundColor: "#490B3D" , border:"none" }}
                    >
                      {item.price / 2}$
                    </Button>
                  </span>
                )}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      {/* Loading Page */}
      {Loading ? (
        <ReactLoading
          type="bubbles"
          color="#F1B814"
          height={150}
          width={100}
          className="Loading"
        />
      ) : // the function for change Row Cards Row from 3 to 2 accroding to the screen
      width < breakpoint ? (
        <Row xs={1} md={2} className="g-3">
          {Products.map((item, idx) => (
            <Col key={idx} className="Hover">
              <Card>
                <Card.Img variant="top" src={require(`.${item.image}`)} />
                <Card.Body>
                  <Card.Title style={{ color: "#490B3D" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Brand: {item.brand}</ListGroupItem>
                    <ListGroupItem>
                      Rating:{" "}
                      <Rating size={25} ratingValue={item.rating * 20} />
                    </ListGroupItem>
                    <ListGroupItem>
                      Price:{" "}
                      <Button
                        variant="danger"
                        style={{ backgroundColor: "#490B3D", border: "none" }}
                      >
                        {item.price}$
                      </Button>
                      <Button variant="warning" as={Link} to={String(item._id)} style={{marginLeft:"2%" , backgroundColor:"#F1B814"}}>Buy</Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        // the defualt row 3 items
        <Row xs={1} md={3} className="g-3">
          {Products.map((item, idx) => (
            <Col key={idx} className="Hover">
              <Card >
                <Card.Img variant="top" src={require(`.${item.image}`)} />
                <Card.Body>
                  <Card.Title style={{ color: "#490B3D" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Brand: {item.brand}</ListGroupItem>
                    <ListGroupItem>
                      Rating:{" "}
                      <Rating size={25} ratingValue={item.rating * 20} />
                    </ListGroupItem>
                    <ListGroupItem >
                      Price:{" "}
                      <Button
                        variant="danger"
                        style={{ backgroundColor: "#490B3D", border: "none" }}
                      >
                        {item.price}$
                      </Button>
                      <Button variant="warning" as={Link} to={String(item._id)} style={{marginLeft:"2%" , backgroundColor:"#F1B814"}}>Buy</Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AllProducts;
