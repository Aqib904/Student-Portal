import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

export default function ManageFine() {
  return (
    <Container fluid>
      <Row>
        <Col lg={4}>
          <Card className="my-1 shadow">
            <CardBody className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fas fa-file-invoice-dollar d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                style={{ fontSize: "50px", width: "130px", height: "130px" }}
              ></i>
              <h4 className=" my-2">Fine List</h4>
              <p className=" my-2 text-center">
                Check all students <br />
                fine list
              </p>
              <Link to="/admin/finelist">
                <Button className="bg-site-success px-4">
                  <i className="fas fa-file-import mx-1"></i>Check Fine
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="my-1 shadow">
            <CardBody className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fas fa-plus d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                style={{ fontSize: "50px", width: "130px", height: "130px" }}
              ></i>
              <h4 className=" my-2">Add Fine</h4>
              <p className=" my-2 text-center">
                Add fine who
                <br />
                violate the rules
              </p>
              <Link to="/admin/addfine">
              <Button className="bg-site-success px-4">
                <i className="fas fa-file-import mx-1"></i>Add Fine
              </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
