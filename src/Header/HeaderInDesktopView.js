import React, { useEffect } from "react";
import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionLogOut, ActionProducts } from "../action";
const HeaderInDesktopView = () => {
  // logout && login handler
  const state = useSelector((e) => e.LogOut);
  const { token } = useSelector((e) => e.SignUp);
  const {tokenLogIn} = useSelector(e=>e.LogIn);
  const tokenReducer = localStorage.getItem('token');
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(ActionLogOut(false));
  };

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

  const [status, setStatus] = useState(false);
  return (
    <Navbar sticky="top" expand="sm" className="all">
      <Container fluid>
        <Navbar.Brand>
          <img alt="Logo" src={require("./img/H2.png")} className="headerImg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Nav
            className="mr-20 my-2 my-lg-0  p-2 active"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Button className="Home" variant="danger" as={Link} to="/">
              Home
            </Button>
          </Nav>
          <Nav
            className="mr-20 my-2 my-lg-0  p-2 active"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Button className="FQ" variant="danger">
              FQ
            </Button>
            <Button className="ContactDesktopView" variant="danger">
              Contact
            </Button>
            <Button className="AboutDesktopView " variant="danger">
              About
            </Button>
          </Nav>
          <Nav
            className="mr-20 my-2 my-lg-0  p-2 active"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!status && (
              <Nav.Link>
                <BsSearch
                  className="searchIcon"
                  onClick={() => setStatus(true)}
                />
              </Nav.Link>
            )}
          </Nav>
          {status && (
            <Container>
              <Row>
                <Col style={{ display: "flex" }}>
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
                  </Form>
                  <CloseButton
                    onClick={() => setStatus(false)}
                    style={{ marginTop: "1%" }}
                  />
                </Col>
              </Row>
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
                    onClick={() => setSearch("")}
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
          )}
          {(state && token && token.token)|| (state&& tokenLogIn&&tokenLogIn.token)||tokenReducer ? (
            <Nav className="end ">
              <NavDropdown
                title={<CgProfile className="account"/>}
                drop="start"
              >
                <NavDropdown.Item  style={{color:'gray' , marginBottom:'5%'}}>
                {localStorage.getItem('name')}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/UserInfo" className="drop">
                  Information user
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/History" className="drop">
                  Purchase history
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ChangeInfo" className="drop">
                  change Information
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  <span className="LogOut">Log Out {<BiLogOut />}</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <>
              <Nav
                className="mr-20 my-2 my-lg-0  p-2 active end"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Button variant="danger" className="Login" as={Link} to="Login">
                  Login
                </Button>
              </Nav>
              <Nav
                className="mr-20 my-2 my-lg-0  p-2 active"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Button className="SignUp" as={Link} to="SignUP">
                  SignUp
                </Button>
              </Nav>
            </>
          )}
          <Nav
            className=" my-2 my-lg-0 ml-auto p-2 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Button
              variant="outline-success"
              className="CardButton"
              as={Link}
              to="SaleCard"
              style={{ position: "relative" }}
            >
              <FaShoppingCart className="Card" variant="outline-success" />
              <span style={{ position: "absolute", color: "red" }}>
                {BoughtItem.length === 0 ? <p></p> : BoughtItem.length}
              </span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderInDesktopView;
