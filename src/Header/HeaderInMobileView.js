import React, { useEffect } from "react";
import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionLogOut, ActionProducts } from "../action";
const HeaderInMobileView = () => {
  //put all product for search
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(ActionProducts());
  }, [dispatch]);
  const [search, setSearch] = useState("");
  //the state for update the sale box every click on add to card
  const refresh = useSelector((e) => e.Refresh);
  const [Re, setRe] = useState(false);
  useEffect(() => {
    refresh === true ? setRe(true) : setRe(false);
  }, [refresh]);
  // the status of the true false for show search icon
  const [status, setStatus] = useState(false);
  // the status for showing deatalis of user
  const [show, setShow] = useState(false);
  // the status for showing menu of webpage in mobile mood
  const [show1, setShow1] = useState(false);
  // all of the handler for showing menues in mobile mood
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  // logout && login handler
  const state = useSelector(e=>e.LogOut)
  const {token} = useSelector(e=>e.SignUp)
  const {tokenLogIn} = useSelector(e=>e.LogIn)
  const tokenReducer = localStorage.getItem('token');
  const logoutHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    dispatch(ActionLogOut(false))
  }

  return (
    <Navbar expand={false} sticky="top" className="all">
      <Container fluid>
        {(state && token && token.token)|| (state&& tokenLogIn&&tokenLogIn.token) || tokenReducer ? (
          <>
            {/* when user login login icon  */}
            <CgProfile className="account" onClick={handleShow} />
            <Offcanvas show={show} onHide={handleClose} placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <img
                    alt="Logo"
                    src={require("./img/H2.png")}
                    className="ImgNav"
                  />
                  <span className="subtitle">AGA Choose Best</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="mr-20 my-2 my-lg-0  p-2 active"
                  style={{ maxHeight: "400px" }}
                  navbarScroll
                >
                  
                  <Button
                    variant="danger"
                    className="Name"
                  >
                    {localStorage.getItem('name')}
                  </Button>
                  <Button
                    className="Home"
                    variant="danger"
                    onClick={handleClose}
                    as={Link} to="/UserInfo"
                  >
                    Information user
                  </Button>
                  <Button
                    className="FQ buttonsNav"
                    variant="danger"
                    onClick={handleClose}
                    as={Link} to="/History"
                  >
                    Purchase history
                  </Button>
                  <Button
                    className="Contact buttonsNav"
                    variant="danger"
                    onClick={handleClose}
                    as={Link} to="/ChangeInfo"
                  >
                    change Information
                  </Button>
                  <NavDropdown.Divider />
                  <Button
                    className="About buttonsNav"
                    variant="danger"
                    onClick={logoutHandler}
                  >
                    <span className="LogOut" >Log Out {<BiLogOut />}</span>
                  </Button>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          // when user logout
          <ButtonGroup className="start" vertical>
            <Button variant="danger" className="Login" as={Link} to="Login">
              Login
            </Button>
            <Button className="SignUp" as={Link} to="SignUP">
              SignUp
            </Button>
          </ButtonGroup>
        )}
        {/* the logo of store */}
        <Navbar.Brand className="end">
          <img
            alt="Logo"
            src={require("./img/H2.png")}
            className="headerImgMobile "
          />
        </Navbar.Brand>
        {/* the sale icon */}
        <Nav className="end" style={{ maxHeight: "100px" }}>
          <Button
            variant="outline-success"
            className="CardButton"
            as={Link}
            to="SaleCard"
            style={{ position: "relative" }}
          >
            <FaShoppingCart className="Card" variant="outline-success" />
            <span style={{ position: "absolute", color: "red" }}>
              {BoughtItem.length === 0 ? <p></p> : BoughtItem.length }
            </span>
          </Button>
        </Nav>
        <>
          {/* the menu off the page in mobile mood */}
          <CgMenu className="account" onClick={handleShow1} />
          <Offcanvas show={show1} onHide={handleClose1} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <img
                  alt="Logo"
                  src={require("./img/H2.png")}
                  className="ImgNav"
                />
                <span className="subtitle">AGA Choose Best</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="mr-20 my-2 my-lg-0  p-2 active"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {
                  <Nav.Link>
                    <BsSearch
                      className="searchIcon"
                      onClick={() => setStatus(true)}
                    />
                  </Nav.Link>
                }
              </Nav>
              {status ? (
                <Container>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2 p-2 search"
                      aria-label="Search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <CloseButton
                      onClick={() => setStatus(false)}
                      style={{ marginTop: "1%" }}
                    />
                  </Form>
                  <Card
                    style={{
                      width: "auto",
                      height: "0.0002rem",
                      display: search.trim() === "" ? "none" : "flex",
                    }}
                  >
                    {Products.filter((item) => {
                      return item.name
                        .toLowerCase()
                        .includes(search.trim().toLowerCase());
                    }).map((item, index) => (
                      <ListGroup.Item
                        as={Link}
                        to={String(item._id)}
                        className="searchList"
                        key={index}
                        onClick={() => handleClose1()}
                      >
                        <span>
                          <img
                            style={{
                              width: "55px",
                              height: "55px",
                              borderRadius: "50%",
                            }}
                            src={require(`.${item.image}`)}
                          />
                        </span>
                        <span style={{ color: "#490B3D" }}>{item.name}</span>
                        <span style={{ color: "#F1B814" }}>{item.price}$</span>
                      </ListGroup.Item>
                    ))}
                  </Card>
                </Container>
              ) : (
                <Nav
                  className="mr-20 my-2 my-lg-0  p-2 active"
                  style={{ maxHeight: "400px" }}
                  navbarScroll
                >
                  <Button
                    className="Home"
                    variant="danger"
                    as={Link}
                    to="/"
                    onClick={handleClose1}
                  >
                    Home
                  </Button>
                  <Button
                    className="FQ buttonsNav"
                    variant="danger"
                    onClick={handleClose1}
                  >
                    FQ
                  </Button>
                  <Button
                    className="Contact buttonsNav"
                    variant="danger"
                    onClick={handleClose1}
                  >
                    Contact Us
                  </Button>
                  <Button
                    className="About buttonsNav"
                    variant="danger"
                    onClick={handleClose1}
                  >
                    About Us
                  </Button>
                </Nav>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </Container>
    </Navbar>
  );
};

export default HeaderInMobileView;
