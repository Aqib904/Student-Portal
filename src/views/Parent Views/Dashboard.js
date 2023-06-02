import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

export default function Dashboard() {
  const history  = useHistory();
  const student = [
    {
      username: "2019-Arid-2951",
      name: "Aqib Siddique",
    },
  ];
  return (
    <Container fluid>
      <Row>
        {student.map((item) => {
          return (
            <Col lg={4}>
              <Card className="my-1 shadow">
                <CardBody className="d-flex align-items-center justify-content-center flex-column">
                  <i
                    className="fas fa-user-graduate d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                    style={{
                      fontSize: "50px",
                      width: "130px",
                      height: "130px",
                    }}
                  ></i>
                  <h4 className=" my-2">{item.name}</h4>
                  <p className=" my-2 text-center">
                    View your child academic detail <br /> and manage fee
                  </p>
                  <Button
                    className="bg-site-success px-4"
                    onClick={() =>
                      history.push({
                        pathname: `/parent/view-information/${item.username}`,
                        state: item.username,
                      })
                    }
                  >
                    <i className="fas fa-eye mx-1"></i>View information
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
