import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentFine } from "../../store/actions/fineAction";
import { useState } from "react";
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

export default function UploadFine() {
  const dispatch = useDispatch();
  const { status, token } = useSelector((state) => state.authUser);
  const { studentFine } = useSelector((state) => state.fine);
  useEffect(() => {
    dispatch(getStudentFine(token?.username));
  }, []);
  return (
    <Container fluid>
      <Row>
        {studentFine?.map((item) => {
          return (
            <Col md={4} sm={12}>
              <Card className="shadow">
                <CardHeader>Fine Details of&nbsp;{item?.date}</CardHeader>
                <CardBody>
                  <Label>Status:</Label>
                  <Input
                    value={
                      item?.status == null || item?.status == false
                        ? "Pending"
                        : "Approved"
                    }
                    disabled={true}
                  ></Input>
                  <Label>Amount:</Label>
                  <Input value={item?.amount} disabled={true}></Input>
                  <Label>Description:</Label>
                  <Input
                    value={item?.description}
                    type="textarea"
                    disabled={true}
                    rows={Math.ceil(item?.description.length / 50)}
                  ></Input>
                </CardBody>
                <CardFooter>
                    <Row className="float-right">
                  {item?.status == null ? (
                    <Button className="bg-site-success">Upload Receipt</Button>
                  ) : item?.status == false ? (
                    <Button className="bg-warning">Update Receipt</Button>
                  ) : (
                    ""
                  )}
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
