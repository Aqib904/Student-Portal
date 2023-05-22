import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCourseAdvisor } from "../../store/actions/courseAdvisorAction";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
export default function AdviseStudent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, courseAdvisorList } = useSelector(
    (state) => state.courseAdvisor
  );
  const { token } = useSelector((state) => state.authUser);
  const [disciplineData,setDisciplineData] = useState([])
  console.log(disciplineData,'disciplineData')
  useEffect(() => {
    dispatch(getStudentCourseAdvisor(token?.username));
  }, [token?.username]);
  useEffect(() => {
    const newData = courseAdvisorList.map((item) => ({
      id: item.id,
      discipline: `${item.program}-${item.semester}${item.section}`
    }));
    setDisciplineData(newData);
  }, [courseAdvisorList]);
  
  return (
  <Container>
    <Row>
        {disciplineData.map((item)=>{
            return(
    <Col lg={4}>
          <Card className="my-1 shadow">
            <CardBody className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fas fa-user-tie d-flex justify-content-center align-items-center border rounded-circle  bg-light"
                style={{ fontSize: "50px", width: "130px", height: "130px" }}
              ></i>
              <h4 className=" my-2">BS{item.discipline}</h4>
              <p className=" my-2 text-center">
                Advise to BS{item.discipline} <br /> Students
              </p>
                <Button className="bg-site-success px-4"
                onClick={() =>
                    history.push({
                      pathname: `/teacher/manage_advise_students/:${item.id}`,
                      state: {id:item.id,discipline:item.discipline,list:courseAdvisorList},
                    })
                  }>
                <i class="fas fa-arrow-right mx-1"></i>Advise Students
                </Button>
            </CardBody>
          </Card>
        </Col>
        )
    })}
    </Row>
  </Container>
  );
}
