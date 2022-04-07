import React, { useEffect, useState } from "react";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ActionGetCity, ActionGetAddress , ActionGetPhone , ActionGetPostalCode } from "../action";
function Addresses() {
// get information of user by global state 
  const dispatch = useDispatch();
  const Address = useSelector(e=>e.Address)
  const Phone = useSelector(e=>e.Phone)
  const City = useSelector(e=>e.City)
  const PostalCode = useSelector(e=>e.PostalCode)
  const infoArray = [
    {City: City},
    {Address: Address},
    {Phone:Phone},
    {PostalCode:PostalCode}
  ]
  const jsonInfoArray = JSON.stringify(infoArray);
  // prevent user to access this page without token
  var token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [navigate, token]);
  //navigate to another field
  const handleInformation=(e)=>{
    e.preventDefault()
    localStorage.setItem('info' , jsonInfoArray)
    navigate('/Factor')
  }
  //all pattern
  const PhoneNumberPattern = /^(\+98|0)?9\d{9}$/
  const postalCodePattern = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/
  return (
    <>
      <div style={{display:"flex" , justifyContent:"space-evenly"}}>
          <Button className="Stepper" variant="danger" >Info</Button>
          <Button className="Stepper" variant="danger" disabled>Factor</Button>
          <Button className="StepperSuccess" variant="success"  disabled>Success Buy</Button>
      </div>
      <Form className="login" style={{marginTop:"5%"}} onSubmit={()=>handleInformation()}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="example: Tehran"
            style={{fontFamily:"Medium"}}
            onChange={(e) => dispatch(ActionGetCity(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Address:</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="1st Alley , second street , ..."
            style={{fontFamily:"Medium"}}
            required
            onChange={(e) => dispatch(ActionGetAddress(e.target.value))}
          />
          {!Address.length >= 1 && (
            <Form.Text style={{ color: "#490B3D" }}>
              We'll never share your Address with anyone else.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>Postal Code:</Form.Label>
          <Form.Control
            type="text"
            onKeyPress={(event) => {
              if (!/[0-9,.]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            required
            placeholder="example: 123456789"
            style={{fontFamily:"Medium"}}
            onChange={(e) => dispatch(ActionGetPostalCode(e.target.value))}
            isValid={postalCodePattern.test(PostalCode)}
            isInvalid={PostalCode && !postalCodePattern.test(PostalCode)}
          />
          <Form.Control.Feedback type="invalid">
            {" "}
            write your postal code correctly
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>Phone number:</Form.Label>
          <Form.Control
            type="text"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            required
            placeholder="example: +98123456789"
            style={{fontFamily:"Medium"}}
            onChange={(e) => dispatch(ActionGetPhone(e.target.value))}
            isValid={PhoneNumberPattern.test(Phone)}
            isInvalid={Phone && !PhoneNumberPattern.test(Phone)}
          />
          {!Phone.length >= 1 && (
            <Form.Text style={{ color: "#490B3D" }}>
              We'll never share your phone number with anyone else.
            </Form.Text>
          )}
          <Form.Control.Feedback type="invalid">
            {" "}
            write your phone number correctly
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          style={{
            backgroundColor: "#490B3D",
            border: "none",
            marginLeft:"auto"
          }}
          center
          onClick={handleInformation}
        >
          Next
        </Button>
        </Form>
    </>
  );
}

export default Addresses;
