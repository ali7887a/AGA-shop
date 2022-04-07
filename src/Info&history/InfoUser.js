import React, { useEffect } from "react";
import { Alert, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionUserInfo } from "../action";
import ReactLoading from "react-loading";
function InfoUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UserInfo , Loading , error } = useSelector((e) => e.UserInfo);
  useEffect(() => {
    dispatch(ActionUserInfo());
  }, [dispatch]);
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
          <Button
            className="back"
            variant="danger"
            onClick={() => navigate(-1)}
          >
            <MdOutlineArrowBackIosNew />
            back
          </Button>
          <Card
            style={{ width: "25rem", marginLeft: "auto", marginRight: "auto" }}
          >
            <Card.Header>Name: {UserInfo&&UserInfo.name}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Email: {UserInfo&&UserInfo.email}</ListGroup.Item>
              <ListGroup.Item>Admin: {UserInfo&&UserInfo.isAdmin ? 'you are Administrator':'...'}</ListGroup.Item>
              <ListGroup.Item>Id: {UserInfo&&UserInfo.id}</ListGroup.Item>
            </ListGroup>
          </Card>
        </>
      )}
      {error&&
        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Something went wrong check your Internet and call to developer</p>
        </Alert>
      }
    </>
  );
}

export default InfoUser;
