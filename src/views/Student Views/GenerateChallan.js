import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

export default function GenerateChallan() {
  const location = useLocation();
  let data = location.state;
  console.log(data,'data');
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
        Generate Challan
      </h4>
      <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
