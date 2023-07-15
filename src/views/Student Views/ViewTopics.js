import React,{useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
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
import moment from 'moment';
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { getCourseTeacher } from "../../store/actions/assessmentAction";

export default function ViewTopics() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teachersData, loading } = useSelector((state) => state.assessment);
  console.log(teachersData, "teacherData");
  const { token, status } = useSelector((state) => state.authUser);
  const [rows, setRows] = useState([]);
  const [endDate, setEndDate] = useState('');
  console.log(endDate,'endDate')
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 240,
    },
    {
      field: "courseName",
      headerName: "Course Name",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Start Feedback",
      width: 280,
      renderCell: (params) => {
        //console.log(params.row,'params.row')
        return (
          <>
            <Button
              className={`${
                params.row.isPending === true ? "bg-danger" : "bg-site-success"
              } text-white border-0`}
              onClick={() => {
                history.push({
                  pathname: `/student/view_course_topics/${params.row.courseCode}`,
                  state: {courseCode:params.row.courseCode,reg_no:token?.username,courseName:params.row.courseName},
                });
              }}
            >
              <i class="fas fa-eye"></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getCourseTeacher(token?.username));
  }, []);
  useEffect(() => {
    if (status == "not-enrolled") {
      history.push("/student/enrollment");
    }
  }, [status]);
  useEffect(() => {
    let tempdata = []
    teachersData?.data && teachersData?.data.map((item)=>{
      return(
        tempdata.push({
          id:item.id,
          teacherName:item.teacherName,
          courseCode:item.courseCode,
          courseName:item.courseName,
        })
      )
    })
      setRows(tempdata);
  }, [teachersData]);
  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-2 shadow">
            <LoadingOverlay
              active={loading}
              spinner
              text="Teachers Data Loading...."
            >
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
            </LoadingOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
