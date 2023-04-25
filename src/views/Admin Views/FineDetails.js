import React from "react";
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
    Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

export default function FineDetails() {
  const location = useLocation();
  const data = location.state;
  console.log(data, "data");
  return (
    <>
      <h4 className="d-none d-md-block m-0 font-weight-bold mx-3">
      <Link className="text-dark" to="/admin/finelist"><i class="fas fa-arrow-alt-circle-left"></i></Link>&nbsp;Fine Details
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>Name:&nbsp;{data?.name}</CardHeader>
              <CardBody>
                <Row>
                  <Col md={6} sm={12}>
                    <Image
                      src={`https://localhost:44374/FineReceiptImages/${data?.receipt}`}
                      alt="Batch"
                    //   height={150}
                    //   width={250}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <Label>Date:</Label>
                    <Input
                      value={data?.date}
                      disabled={true}
                      type="text"
                    ></Input>
                    <Label>Amount</Label>
                    <Input
                      value={data?.amount}
                      disabled={true}
                      type="text"
                    ></Input>
                    <Label>Description:</Label>
                    <Input
                      value={data?.description}
                      type="textarea"
                      disabled={true}
                      rows={Math.ceil(data?.description.length / 50)}
                    ></Input>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row className="float-right">
                <Button className="bg-site-success mx-2">Accept Fine</Button>
                <Button className="bg-danger">Reject Fine</Button>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
