import React, {  useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { ActionLogIn, ActionLogOut } from "../action";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const [UserName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((e) => e.LogIn);
  // prevent user to access this page with token
  var token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const Fn1 = () => {
    UserName.length >= 1 &&
    pass.length >= 1 &&
    error !== 401 &&
    dispatch(ActionLogIn(UserName, pass))
  };
  const Fn2=()=>{
    alert("you are successfully Logged In")
    navigate("/");
  }
  const logInHandler = (e) => {
    e.preventDefault();
    Fn1();
    UserName.length >= 1 &&
      pass.length >= 1 &&
      error !== 401 &&
      dispatch(ActionLogOut(true));
    if (!pass.length >= 1) {
      alert("the password field is empty");
    }
    if (!UserName.length >= 1) {
      alert("the name field is empty");
    }
    if(error!==401){
      Fn2();
    }
  };
  return (
    <div>
      <Button className="back" variant="danger" onClick={() => navigate(-1)}>
        {" "}
        <MdOutlineArrowBackIosNew /> Back
      </Button>
      {error === 401 && (
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
          Invalid Email or Password
        </p>
      )}
      <Form className="login" onSubmit={()=>logInHandler()}>
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>
            Username(your Email)
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
            isValid={emailPattern.test(UserName)}
            isInvalid={UserName && !emailPattern.test(UserName)}
          />
          {!UserName.length >= 1 && (
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
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
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
          onClick={logInHandler}
        >
          Log In
        </Button>
        <br />
        <Link to="/SignUp">Don't have account? click here</Link>
      </Form>
    </div>
  );
};

export default Login;
