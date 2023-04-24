import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

export default function Finance() {
  const history = useHistory();
  const { status} = useSelector((state) => state.authUser);
  useEffect(()=>{
    if(status==false){
      history.push("/student/enrollment")
    }
  },[status])
  return (
    <Container>
      <Row>
        <Col lg={4}>
          
          <Card className='my-1 shadow'>
            <CardBody className='d-flex align-items-center justify-content-center flex-column'>
            <i
              className="fas fa-file-invoice-dollar d-flex justify-content-center align-items-center border rounded-circle  bg-light"
              style={{ fontSize: "50px", width: "130px", height: "130px" }}
            ></i>
            <h4 className=" my-2">Fee</h4>
            <p className=" my-2 text-center">Generate and Upload <br/> fee challan</p>
            <Link to="/student/fee_detail">
            <Button className="bg-site-success px-4">
            <i className="fas fa-file-import mx-1"></i>Get Fee Challan
            </Button></Link>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className='my-1 shadow'>
            <CardBody className='d-flex align-items-center justify-content-center flex-column'>
            <i
              className="fas fa-hand-holding-usd d-flex justify-content-center align-items-center border rounded-circle  bg-light"
              style={{ fontSize: "50px", width: "130px", height: "130px" }}
            ></i>
            <h4 className=" my-2">Fine</h4>
            <p className=" my-2 text-center">Upload your fine<br/> receipt</p>
            <Button className="bg-site-success px-4">
            <i className="fas fa-file-import mx-1"></i>Fine Receipt
            </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className='my-1 shadow'>
            <CardBody className='d-flex align-items-center justify-content-center flex-column'>
            <i
              className="fas fa-user-circle d-flex justify-content-center align-items-center border rounded-circle  bg-light"
              style={{ fontSize: "50px", width: "130px", height: "130px" }}
            ></i>
            <h4 className=" my-2">Financial assistance</h4>
            <p className=" my-2 text-center">Apply for Financial<br/>assistance </p>
            <Link to="/student/financial_assistance">
            <Button className="bg-site-success px-4">
            <i className="fas fa-file-import mx-1"></i>Request
            </Button>
            </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
