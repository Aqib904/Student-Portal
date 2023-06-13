import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { addAdvisorDetailAction } from "../../store/actions/courseAdvisorAction";
export default function ManageAdvises() {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading} = useSelector(
    (state) => state.courseAdvisor
  );
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [advise, setAdvise] = useState("");
  const [regularCourses, setRegularCourses] = useState([]);
  const [failedCourses, setFailedCourses] = useState([]);
  const [remainingCourses, setRemainingCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //console.log(regularCourses, failedCourses, remainingCourses, data, "data");
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
    <div>
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
            </div>
      <Container fluid>
        <Row>
          <Col>
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            let obj = {
              advise:advise,
              reg_no:data.reg_no,
              course_advisor_id:data.ids
            }
            dispatch(addAdvisorDetailAction(obj,()=>{
              toggle()
            }))
          }}
        >
          <ModalBody>
            <Input
              type="textarea"
              required={true}
              placeholder="Enter the advise..."
              value={advise}
              onChange={(e) => {
                setAdvise(e.target.value);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-site-primary w-25 mx-2" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
