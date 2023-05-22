import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import user from "../../assets/img/user.png";
export default function ManageAdviseStudents() {
  const location = useLocation();
  const history = useHistory();
  const courseAdvisorList = location?.state;
  const [rows, setRows] = useState([]);
  console.log(rows, "courseAdvisorList");
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const ImageCell = (props) => {
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
      setShowModal(!showModal);
    };

    return (
      <>
        <div onClick={handleImageClick}>
          <img
            className="rounded-circle"
            height={50}
            width={50}
            src={
              props.row.profile_pic
                ? `https://localhost:44374/AttendanceImages/${props.row.profile_pic}`
                : user
            }
            alt={props.row.profile_pic}
          />
        </div>
        <Modal isOpen={showModal} toggle={handleImageClick}>
          <ModalHeader toggle={handleImageClick}>Image Preview</ModalHeader>
          <ModalBody>
            <img
              className=""
              height={200}
              width={200}
              src={
                props.row.profile_pic
                  ? `https://localhost:44374/AttendanceImages/${props.row.profile_pic}`
                  : user
              }
              alt={props.row.profile_pic}
            />
          </ModalBody>
        </Modal>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "profile_pic",
      headerName: "Profile Photo",
      width: 150,
      renderCell: (params) => {
        return <ImageCell row={params.row} />;
      },
    },
    {
      field: "reg_no",
      headerName: "Reg no",
      width: 190,
    },
    {
      field: "student_name",
      headerName: "Student name",
      width: 230,
    },
    {
      field: "cgpa",
      headerName: "Cgpa",
      width: 170,
    },
    {
      field: "Action",
      type: "action",
      headerName: "Manage Request",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              className="bg-site-success"
              onClick={() =>
                history.push({
                  pathname: `/teacher/manage_advises/:${params.row.reg_no}`,
                  state: params.row,
                })
              }
            >
              <i class="fas fa-eye"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const advisorId = courseAdvisorList.id;
    const advisorList = courseAdvisorList.list;
    let index = 0;
    const student = advisorList.find((item) => item.id === advisorId);

    if (student) {
      const rows = student.sList.map((item) => {
        index++;
        return {
          id: index,
          ids:advisorId,
          profile_pic: item.profile_pic,
          reg_no: item.reg_no,
          student_name: item.student_name,
          cgpa: item.cgpa,
          failed_courses:item.failed_courses,
          regular_courses:item.regular_courses,
          remaining_courses:item.remaining_courses,
          courseAdvisorList:courseAdvisorList
        };
      });
      setRows(rows);
    }
  }, [courseAdvisorList]);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-3">
        <Link className="text-dark" to="/teacher/advise-student">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Students
      </h4>
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow my-4">
              <CardHeader>
                Discipline:&nbsp;BS{courseAdvisorList.discipline}
              </CardHeader>
              <CardBody>
                <StripedDataGrid
                  autoHeight
                  autoWidth
                  columns={columns}
                  rows={rows}
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
    </>
  );
}
