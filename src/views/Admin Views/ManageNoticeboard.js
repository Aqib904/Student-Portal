import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNoticeBoard,
  getSectionList,
} from "../../store/actions/noticeboardAction";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
export default function ManageNoticeboard() {
  const dispatch = useDispatch();
  const { sectionList, loading, addloading } = useSelector(
    (state) => state.noticeboard
  );
  const [selectedData, setSelectedData] = useState([]);
  const [selectedSections, setSelectedSections] = useState({});
  const [noticeData, setNoticeData] = useState({ title: "", description: "" });
  //console.log(selectedData, "SelectedData");
  //console.log(noticeData, "noticeData");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const handleSemesterChange = (program, semester) => {
    const updatedData = [...selectedData];
    const dataIndex = updatedData.findIndex(
      (data) => data.program === program && data.semester === semester
    );

    if (dataIndex > -1) {
      // Remove the data if it already exists
      updatedData.splice(dataIndex, 1);
    } else {
      // Add the data if it doesn't exist
      const selectedSections = sectionList
        .find((item) => item.program === program)
        .semesters.find((sem) => sem.no === semester)?.sections;
      updatedData.push({
        program,
        semester,
        section: selectedSections,
      });
    }
    setSelectedData(updatedData);
    setSelectedSections((prevState) => ({
      ...prevState,
      [semester]: updatedData[dataIndex]?.section || [],
    }));
  };

  const handleSectionChange = (program, semester, section) => {
    const updatedData = [...selectedData];
    const dataIndex = updatedData.findIndex(
      (data) => data.program === program && data.semester === semester
    );
    if (dataIndex > -1) {
      const selectedSections = [...updatedData[dataIndex].section] || [];
      const sectionIndex = selectedSections.indexOf(section);
      if (sectionIndex > -1) {
        selectedSections.splice(sectionIndex, 1);
      } else {
        selectedSections.push(section);
      }
      updatedData[dataIndex].section = selectedSections;
    } else {
      updatedData.push({
        program,
        semester,
        section: [section],
      });
    }
    setSelectedData(updatedData);
  };

  //console.log(sectionList, "sectionList");
  useEffect(() => {
    dispatch(getSectionList());
  }, []);

  useEffect(() => {
    // You can do something with selectedData here
    //console.log(selectedData);
  }, [selectedData]);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                let obj = {
                  n: noticeData,
                  slist: selectedData,
                };
                if (selectedData.length == 0) {
                  toast.error("Must select the discipline");
                } else {
                  dispatch(addNoticeBoard(obj));
                  setNoticeData({ title: "", description: "" })
                  setSelectedData([])
                }
              }}
            >
              <CardHeader>Add Notice</CardHeader>
              <CardBody>
                <Label>Title:</Label>
                <Input
                  placeholder="Enter the title"
                  type="text"
                  value={noticeData.title}
                  onChange={(e) =>
                    setNoticeData({ ...noticeData, title: e.target.value })
                  }
                  required
                />
                <Label className="my-2">Description:</Label>
                <Input
                  placeholder="Enter the description..."
                  type="textarea"
                  value={noticeData.description}
                  onChange={(e) =>
                    setNoticeData({
                      ...noticeData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </CardBody>
              <CardFooter>
                <Button
                  className="bg-site-primary"
                  type="submit"
                  disabled={addloading}
                >
                  {addloading ? <Spinner size="sm" /> : "Add Notice"}
                </Button>
                <Button className="bg-site-primary mx-2" onClick={toggle}>
                  Select Discipline
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Select Discipline</ModalHeader>
        <ModalBody>
          <Card className="shadow w-100">
            <CardHeader></CardHeader>
            <div>
              {sectionList.map((item, index) => (
                <React.Fragment key={item.program} className="bg-site-table">
                  <Row>
                    <Col>
                      <FormGroup check className="mx-3">
                        <h5 check>
                          <Input
                            type="checkbox"
                            checked={selectedData.some(
                              (data) => data.program === item.program
                            )}
                            onChange={() =>
                              handleSemesterChange(item.program, 1)
                            }
                          />
                          BS{item.program}
                        </h5>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {item.semesters.map((semester, semesterIndex) => (
                      <React.Fragment key={semester.no}>
                        <Col>
                          <CardBody>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  checked={selectedData.some(
                                    (data) =>
                                      data.program === item.program &&
                                      data.semester === semester.no
                                  )}
                                  onChange={() =>
                                    handleSemesterChange(
                                      item.program,
                                      semester.no
                                    )
                                  }
                                />
                                Semester {semester.no}
                              </Label>
                            </FormGroup>

                            <Collapse
                              isOpen={selectedData.some(
                                (data) =>
                                  data.program === item.program &&
                                  data.semester === semester.no
                              )}
                            >
                              {semester.sections.map((section) => (
                                <FormGroup check inline key={section}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      checked={selectedData.some(
                                        (data) =>
                                          data.program === item.program &&
                                          data.semester === semester.no &&
                                          (data.section || []).includes(section)
                                      )}
                                      onChange={() =>
                                        handleSectionChange(
                                          item.program,
                                          semester.no,
                                          section
                                        )
                                      }
                                    />
                                    Section {section}
                                  </Label>
                                </FormGroup>
                              ))}
                            </Collapse>
                          </CardBody>
                        </Col>
                        {semesterIndex % 2 === 1 && <div className="w-100" />}{" "}
                        {/* Add a new row after every second semester */}
                      </React.Fragment>
                    ))}
                  </Row>
                  {index !== sectionList.length - 1 && <hr />}{" "}
                  {/* Add a line after each program except the last one */}
                </React.Fragment>
              ))}
            </div>
          </Card>
        </ModalBody>
      </Modal>
    </Container>
  );
}
