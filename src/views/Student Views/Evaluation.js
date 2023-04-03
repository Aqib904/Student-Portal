import React from "react";
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
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { getCourseTeacher } from "../../store/actions/assessmentAction";

export default function Assessment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { teachersData ,loading} = useSelector((state) => state.assessment);
  const { token,status } = useSelector((state) => state.authUser);
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
      width: 170,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Start Feedback",
      width: 280,
      renderCell: (params) => {
        console.log(params.row,'params.row')
        return (
          <>
            <Button
              className={`${params.row.isPending===true?"bg-danger":"bg-site-success"} text-white border-0`}
              disabled={params.row.isPending===false?true:false}
              onClick={() => {
                history.push({
                  pathname: `/student/evaluation/${params.row.courseCode}`,
                  state: params.row,
                });
              }}
            >
              <i className="fas fa-star-half-alt "></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getCourseTeacher(token?.username));
  }, []);
  useEffect(()=>{
    if(status==false){
      history.push("/student/enrollment")
    }
  },[status])
  return (
    <Container>
      <Row>
        <Col >
          <Card className="my-2 ">
            <CardHeader></CardHeader>
            <CardBody>
            <LoadingOverlay active={loading} spinner text="Teachers Data Loading...."> 
            <StripedDataGrid
              autoHeight
              autoWidth
              columns={columns}
              rows={teachersData}
              disableSelectionOnClick={false}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "odd" : "even"
              }
              hideFooterPagination={true}
            />
            </LoadingOverlay>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
