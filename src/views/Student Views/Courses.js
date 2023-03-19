import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import course1 from "../../assets/img/course1.svg";
import course2 from "../../assets/img/course2.svg";
import course3 from "../../assets/img/course3.svg";
import course4 from "../../assets/img/course4.svg";
export default function Courses() {
  const courses = [
    {
      name: "Compiler Construction",
      session: "Fall-2022",
      course_code: "CS322",
      img: course1,
    },
    {
      name: "Information Security",
      session: "Fall-2022",
      course_code: "CS892",
      img: course2,
    },
    { name: "FYP-1", session: "Fall-2022", course_code: "CS326", img: course3 },
    {
      name: "Mobile Application",
      session: "Fall-2022",
      course_code: "CS402",
      img: course4,
    },
  ];
  return (
    <Container fluid>
      <Row>
        {courses.map((data) => {
          return (
            <Col lg="3" md={4} sm={12}>
              <Card className="shadow my-2">
                <img
                  className="card-img-top"
                  height={150}
                  src={data.img}
                  alt="Card image cap"
                />

                <p className="card-text mx-2">
                  {data.session} | {data.course_code}
                </p>
                <h6 className="mx-2">{data.name}</h6>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
