import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default HomeScreen;
