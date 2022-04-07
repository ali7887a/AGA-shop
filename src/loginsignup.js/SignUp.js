import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ActionLogOut, ActionSignUp } from "../action";
const SignUp = () => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((e) => e.SignUp);
  const navigate = useNavigate();
  // prevent user to access this page with token
  var token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  
  const Fn1 = () => {
    Name.length >= 1 &&
      pass.length >= 8 &&
      pass === passCheck &&
      emailPattern.test(email) &&
      error!==400&&
      dispatch(ActionSignUp(Name, email, pass));
  };
  const Fn2 = () => {
    Name.length >= 1 &&
      pass.length >= 8 &&
      pass === passCheck &&
      emailPattern.test(email) &&
      dispatch(ActionLogOut(true));
  };
  const Fn3 = () => {
    if (!pass.length >= 8) {
      alert("the password is to short!!");
    }
    if (pass !== passCheck) {
      alert("the password and the checkpassword didn't match!!");
    }
    if (!emailPattern.test(email)) {
      alert("email is invalid");
    }
    if (!Name.length >= 1) {
      alert("the Name field is empty");
    }
    if(error){
      navigate("/SignUP")
    }else if (
      Name.length >= 1 &&
      pass.length >= 8 &&
      pass === passCheck &&
      emailPattern.test(email)&&
      error !== 400
    ) {
      alert("your account was created successfully (:");
      navigate("/");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    Fn1();
    Fn2();
    Fn3();
  };
  return (
    <div>
      <Button className="back" variant="danger" onClick={() => navigate(-1)}>
        {" "}
        <MdOutlineArrowBackIosNew /> Back
      </Button>
      {error === 400 && (
        <p
          style={{
            border: "2px solid red",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            fontSize: "larger",
            color: "red",
          }}
        >
          there is an account with this username and email
        </p>
      )}
      {error && error !== 400 && (
        <p
          style={{
            border: "2px solid red",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            fontSize: "larger",
            color: "red",
          }}
        >
          something went wrong call developer to fix it
        </p>
      )}
      <Form className="login" onSubmit={submitHandler}>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "white" }}>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassCheck(e.target.value)}
            maxLength={16}
            minLength={8}
            isInvalid={pass && passCheck && pass !== passCheck}
            isValid={pass && passCheck && pass === passCheck}
          />
          <Form.Control.Feedback type="invalid">
            didn't match to your password
          </Form.Control.Feedback>
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
          onClick={submitHandler}
        >
          Sign Up
        </Button>
        <br />
        <Link to="/Login">Do you have account? click here</Link>
      </Form>
    </div>
  );
};

export default SignUp;
