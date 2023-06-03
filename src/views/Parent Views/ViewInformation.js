import React, { useEffect,useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

export default function ViewInformation() {
  const location = useLocation();
  const history = useHistory();
  const[username,setUsername] = useState(location?.state)
  useEffect(()=>{
  setUsername(location?.state)
  },[location])
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-2">
        <Link className="text-dark" to="/parent/dashboard">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;View Information
      </h4>
      <Container fluid>
        <Row className="my-3">
          <Col lg={4}>
            <Card className="my-1 shadow">
              <CardBody className="d-flex align-items-center justify-content-center flex-column">
                <i
                  className="fas fa-book d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                  style={{
                    fontSize: "50px",
                    width: "130px",
                    height: "130px",
                  }}
                ></i>
                <h4 className=" my-2">Academic Detail</h4>
                <p className=" my-2 text-center">
                  View your child academic detail 
                </p>
                <Button
                  className="bg-site-success px-4"
                  onClick={() =>
                    history.push({
                      pathname: `/parent/academic-detail/${username}`,
                      state: username,
                    })
                  }
                >
                  <i className="fas fa-eye mx-1"></i>View
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="my-1 shadow">
              <CardBody className="d-flex align-items-center justify-content-center flex-column">
                <i
                  className="fas fa-award  d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                  style={{
                    fontSize: "50px",
                    width: "130px",
                    height: "130px",
                  }}
                ></i>
                <h4 className=" my-2">Exam Record</h4>
                <p className=" my-2 text-center">
                  View all exam record of your child 
                </p>
                <Button
                  className="bg-site-success px-4"
                  onClick={() =>
                    history.push({
                      pathname: `/parent/view-exam-result/${username}`,
                      state: username,
                    })
                  }
                >
                  <i className="fas fa-eye mx-1"></i>View
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="my-1 shadow">
              <CardBody className="d-flex align-items-center justify-content-center flex-column">
                <i
                  className="fas fa-money-check d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                  style={{
                    fontSize: "50px",
                    width: "130px",
                    height: "130px",
                  }}
                ></i>
                <h4 className=" my-2">Fee Detail</h4>
                <p className=" my-2 text-center">
                  View your child Fee detail 
                </p>
                <Button
                  className="bg-site-success px-4"
                  onClick={() =>
                    history.push({
                      pathname: `/parent/view-fee-detail/${username}`,
                      state: username,
                    })
                  }
                >
                  <i className="fas fa-eye mx-1"></i>View
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
