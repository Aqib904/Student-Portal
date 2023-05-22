import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
export default function ManageAdvises() {
  const location = useLocation();
  const data = location.state;
  const history = useHistory();
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [regularCourses, setRegularCourses] = useState([]);
  const [failedCourses, setFailedCourses] = useState([]);
  const [remainingCourses, setRemainingCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log(regularCourses, failedCourses, remainingCourses, data, "data");
  const Columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "course_code",
      headerName: "Course code",
      width: 190,
    },
    {
      field: "course_name",
      headerName: "Course name",
      width: 320,
    },
  ];
  useEffect(() => {
    let indexs = 0;
    let regular = [];
    let failed = [];
    let remaining = [];
    data.regular_courses.map((item) => {
      indexs++;
      return regular.push({
        reg_no: data.reg_no,
        caid: data.ids,
        id: indexs,
        course_code: item.course_code,
        course_name: item.course_name,
      });
    });
    data.failed_courses.map((item) => {
      indexs++;
      return failed.push({
        reg_no: data.reg_no,
        caid: data.ids,
        id: indexs,
        course_code: item.course_code,
        course_name: item.course_name,
      });
    });
    data.remaining_courses.map((item) => {
      indexs++;
      return remaining.push({
        reg_no: data.reg_no,
        caid: data.ids,
        id: indexs,
        course_code: item.course_code,
        course_name: item.course_name,
      });
    });
    setRemainingCourses(remaining);
    setFailedCourses(failed);
    setRegularCourses(regular);
  }, [data]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
        <Link
          className="text-dark"
          onClick={() =>
            history.push({
              pathname: `/teacher/manage_advise_students/:${data.ids}`,
              state: data.courseAdvisorList,
            })
          }
        >
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Manage Advise
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <div className="my-3 mx-4">
              <h6 className="d-inline-block ">&nbsp;&nbsp;Student:</h6>
              <span>&nbsp;{data.student_name}</span>
              <Button
                className="bg-site-primary float-right mt-n1"
                onClick={() => {
                  toggle();
                }}
              >
                Add Advise
              </Button>
            </div>
            <Card className="shadow my-4">
              <CardHeader>Regular Courses</CardHeader>
              <CardBody>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={Columns}
                  rows={regularCourses}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>Failed Courses</CardHeader>
              <CardBody>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={Columns}
                  rows={failedCourses}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>Remaining Courses</CardHeader>
              <CardBody>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={Columns}
                  rows={remainingCourses}
                  disableSelectionOnClick={false}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
                  }
                  hideFooterPagination={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Advise Box</ModalHeader>
        <ModalBody>
          {/* <Label>Enter your advise:</Label> */}
          <Input type="textarea" placeholder="Enter the advise..."></Input>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-site-primary w-25 mx-2">Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
