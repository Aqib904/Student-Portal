import React, { useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { addTopics } from "../../store/actions/noticeboardAction";

export default function AddTopics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location?.state;
  const { addloading } = useSelector((state) => state.noticeboard);
  const [inputField, setInputField] = useState([
    { date: "", topics: [{ task: "" }] },
  ]);
  const today = new Date();
  const initialDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
  const [selectedDay, setSelectedDay] = useState(initialDate);
  console.log(inputField, "input");
  const handleAddTopic = () => {
    setInputField([...inputField, { date: "", topics: [{ task: "" }] }]);
  };

  const handleRemoveTopic = (index) => {
    const list = [...inputField];
    list.splice(index, 1);
    setInputField(list);
  };

  const handleAddTodo = (topicIndex) => {
    const list = [...inputField];
    list[topicIndex].topics.push({ task: "" });
    setInputField(list);
  };

  const handleRemoveTodo = (topicIndex, todoIndex) => {
    const list = [...inputField];
    list[topicIndex].topics.splice(todoIndex, 1);
    setInputField(list);
  };
 const dateFormat = (dateString) => {
    if (dateString !== "") {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
  };
  const handleInputChange = (e, topicIndex, todoIndex) => {
    if (e.target.name == "date") {
      const { name, value } = e.target;
      const list = [...inputField];
      list[topicIndex][name] =value;
      setInputField(list);
    } else {
      console.log(e.target.value, "name");
      const { name, value } = e.target;
      const list = [...inputField];
      list[topicIndex].topics[todoIndex][name] = value;
      setInputField(list);
    }
  };
  const handleSubmit = () => {
    let obj = {
      allocation_id: data?.allocation_id,
      title: data?.title,
      days: inputField,
    };
    console.log(obj, "obj");
    dispatch(addTopics(obj, () => {
        setInputField([{ date: "", topics: [{ task: "" }] }]);
      }));
  };
  console.log(data, "add");

  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-4">
        Add Topics
      </h4>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} sm={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Card className="shadow my-3">
                <CardHeader>
                  <p className="d-inline-block">
                    Discipline: {data?.discipline}
                  </p>
                  <Button className="bg-site-primary float-right" type="submit">
                    {" "}
                    {addloading ? <Spinner size="sm" /> : "Submit"}
                  </Button>
                </CardHeader>
                <CardBody>
                  <Label>Title:</Label>
                  <Input type="text" disabled={true} value={data?.title} />
                  {inputField.map((topic, topicIndex) => (
                    <div key={topicIndex}>
                      <Row>
                        <Col md={12} sm={12} className="my-2">
                          <Card>
                            <FormGroup className="col-12 my-1 d-flex align-items-center justify-content-center">
                              <Input
                                type="date"
                                name="date"
                                value={topic.date}
                                required
                                onChange={(e) =>
                                  handleInputChange(e, topicIndex, "")
                                }
                              />
                            </FormGroup>
                            {topic.topics.map((todo, todoIndex) => (
                              <>
                                <FormGroup className="col-12">
                                  <Input
                                    key={todoIndex}
                                    required
                                    type="text"
                                    placeholder="Topic"
                                    name="task"
                                    value={todo.task}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        topicIndex,
                                        todoIndex
                                      )
                                    }
                                    className="form-control my-1"
                                  />
                                </FormGroup>
                                <FormGroup className="col-12 d-flex align-items-center justify-content-center">
                                  {topic.topics.length - 1 === todoIndex && (
                                    <Button
                                      className="bg-site-primary form-control material-icons"
                                      style={{
                                        marginBottom: "3px",
                                        width: "auto",
                                        marginLeft: "3px",
                                      }}
                                      onClick={() => handleAddTodo(topicIndex)}
                                    >
                                      Add Topic
                                    </Button>
                                  )}
                                  {topic.topics.length !== 1 && (
                                    <Button
                                      className="bg-site-primary form-control material-icons"
                                      style={{
                                        marginBottom: "3px",
                                        width: "auto",
                                        display: "inline-block",
                                        marginLeft: "3px",
                                      }}
                                      onClick={() =>
                                        handleRemoveTodo(topicIndex, todoIndex)
                                      }
                                    >
                                      Remove Topic
                                    </Button>
                                  )}
                                </FormGroup>
                              </>
                            ))}
                          </Card>
                        </Col>
                      </Row>
                      {inputField.length !== 1 && (
                        <div className="d-flex justify-content-center align-items-center ">
                          <Button
                            className="bg-site-primary form-control material-icons"
                            style={{
                              marginBottom: "3px",
                              width: "auto",
                              display: "inline-block",
                              marginLeft: "3px",
                            }}
                            onClick={() => handleRemoveTopic(topicIndex)}
                          >
                            Remove Day
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="d-flex justify-content-center align-items-center ">
                    <Button
                      className="bg-site-primary form-control material-icons"
                      style={{ width: "auto", marginTop: "10px" }}
                      onClick={handleAddTopic}
                    >
                      Add Day
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
