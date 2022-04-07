import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionChangeInfo } from "../action";

function Change() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ChangeInfo, error } = useSelector((e) => e.ChangeInfo);
  ChangeInfo && localStorage.setItem("name", ChangeInfo.name);
  ChangeInfo && localStorage.setItem("token", ChangeInfo.token);
  // prevent user to access this page without token
  var token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [navigate, token]);
  //email pattern and local state
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [pass, setPass] = useState("");
  const ChangeHandler = (e) => {
    e.preventDefault();
    dispatch(ActionChangeInfo(Name, email, pass));
  };
    useEffect(() => {
      error &&
      alert(
        "there is an user with this information absoultly emailaddress please choose another email, AGA manager"
      )
      !error&&ChangeInfo&&alert('your changes has been successfully done ,AGA manager')
      !error&&ChangeInfo&&navigate('/')
    }, [error , ChangeInfo])
  return (
    <>
      <Button className="back" variant="danger" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIosNew />
        back
      </Button>
      <Form className="login" onSubmit={ChangeHandler}>
        <Image
          src={require("../Header/img/H1.jpg")}
          className="headerImg"
          fluid={true}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            isValid={emailPattern.test(email)}
            isInvalid={email && !emailPattern.test(email)}
          />
          {!email.length >= 1 && (
            <Form.Text style={{ color: "#490B3D" }}>
              We'll never share your email with anyone else.
            </Form.Text>
          )}
          <Form.Control.Feedback type="valid">
            {" "}
            your email is correct one
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            write your email correctly
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "white" }}>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPass(e.target.value)}
            maxLength={16}
            minLength={8}
            isInvalid={pass && pass.length < 8}
            isValid={pass.length >= 8}
          />
          <Form.Control.Feedback type="invalid">
            the password at least should have 8 characters!!
          </Form.Control.Feedback>
          {!pass.length >= 1 && (
            <Form.Text style={{ color: "#490B3D" }}>
              write your password between 8 to 16 characters
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          style={{
            backgroundColor: "#490B3D",
            marginLeft: "auto",
            marginRight: "auto",
            border: "none",
          }}
          center
          onClick={ChangeHandler}
        >
          Change information
        </Button>
      </Form>
    </>
  );
}

export default Change;
