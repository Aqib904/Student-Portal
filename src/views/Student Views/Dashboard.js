import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import AttendancePercentage from "./AttendancePercentage";
import TodayTimetable from "./TodayTimetable";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function Dasbaord() {
  const history =useHistory();
  const { status} = useSelector((state) => state.authUser);
  useEffect(()=>{
    if(status==false){
      history.push("/student/enrollment")
    }
  },[status])
  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={5}>
          <TodayTimetable />
        </Col>
        <Col sm={12} md={12} lg={7}>
          <AttendancePercentage />
        </Col>
      </Row>
    </Container>
  );
}
