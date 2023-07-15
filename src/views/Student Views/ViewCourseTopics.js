import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getStudentTopics } from "../../store/actions/noticeboardAction";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

export default function ViewCourseTopics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location?.state;
  const { studentTopics } = useSelector((state) => state.noticeboard);
  console.log(studentTopics, "studentTopics");
  const today = new Date();
  console.log(today.getDate(), "today");
  useEffect(() => {
    dispatch(getStudentTopics(data?.courseCode, data?.reg_no));
  }, []);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-4">
        View Course Topics
      </h4>
      <Container fluid>
        <Row>
          <Col>
            {studentTopics.length == 0 ? (
              <Card className="Shadow my-5">
                <CardHeader>CourseName: {data?.courseName}</CardHeader>
                <CardBody>
                  <p className="text-center">
                    Yet No Topic Added in this course!
                  </p>
                </CardBody>
              </Card>
            ) : (
              studentTopics?.map((item) => {
                return (
                  <Row>
                    <Col md={4} sm={12}>
                      <Card className="shadow my-4">
                        <CardHeader>CourseName: {data?.courseName}</CardHeader>
                        <CardBody>
                          <h5>{item?.title}</h5>
                          {item?.days?.map((item1) => {
                            return (
                              <div
                                className={`mx-3 p-2 ${
                                  item1?.date.split("-")[2] == today.getDate()
                                    ? "bg-danger"
                                    : "bg-site-today"
                                }`}
                              >
                                <p>{item1.date}</p>
                                {item1?.topics?.map((item3) => {
                                  return (
                                    <div className="d-inline-block">
                                      <span className="topics-dot d-inline-block "></span>
                                      <p className="mx-1 d-inline-block">
                                        {item3}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                );
              })
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
