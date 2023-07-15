import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getTopics } from "../../store/actions/noticeboardAction";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";

export default function ManageTopics() {
  const { topics } = useSelector((state) => state.noticeboard);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const data = location?.state;
  console.log(data, "data");
  console.log(topics, "topics");
  useEffect(() => {
    dispatch(getTopics(data?.allocation_id));
  }, [data]);
  useEffect(() => {
    let title = "Week";
    let count = 0;
    if (topics) {
      topics.map((item) => {
        return (count = item?.title.split(" ")[1]);
      });
      console.log(count, "count");
      let parseCount = parseInt(count);
      parseCount = parseCount + 1;
      let final = title + "" + parseCount;
      setTitle(final);
    }
  }, [topics]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-4">
        Manage Topics
      </h4>

      <Container>
        {topics.length == 0 ? (
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} sm={12}>
              <Card className="shadow my-4">
                <CardHeader>Discipline: {data?.discipline}</CardHeader>
                <CardBody>
                  <p className="text-center">No Data Found!</p>
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-site-primary"
                    onClick={() => {
                      history.push({
                        pathname: `/teacher/add_topics/${data?.discipline}`,
                        state: {
                          allocation_id: data?.allocation_id,
                          discipline: data?.discipline,
                          id: data?.id,
                          section: data?.section,
                          title: title == "" ? "Week 1" : title,
                        },
                      });
                    }}
                  >
                    Add Topics
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        ) : (
          topics?.map((item) => {
            return (
              <Row>
                <Col md={4} sm={12}>
                  <Card className="shadow my-4">
                    <CardHeader>Discipline: {data?.discipline}</CardHeader>
                    <CardBody>
                      <h5>{item?.title}</h5>
                      {item?.days?.map((item1) => {
                        return (
                          <div className="mx-3">
                            <p>{item1.date}</p>
                            {item1?.topics?.map((item3) => {
                              return (
                                <div className="d-inline-block">
                                  <span className="topics-dot d-inline-block "></span>
                                  <p className="mx-1 d-inline-block">{item3}</p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="bg-site-primary"
                        onClick={() => {
                          history.push({
                            pathname: `/teacher/add_topics/${data?.discipline}`,
                            state: {
                              allocation_id: data?.allocation_id,
                              discipline: data?.discipline,
                              id: data?.id,
                              section: data?.section,
                              title: "Week 2",
                            },
                          });
                        }}
                      >
                        Add Topics
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            );
          })
        )}
      </Container>
    </>
  );
}
