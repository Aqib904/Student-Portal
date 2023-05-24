import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluatingTeacher } from "../../store/actions/TeacherEvaluationAction";
import { Button, Card, Col, Container, Row } from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
export default function TeacherEvaluation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, teacherList } = useSelector(
    (state) => state.teacherevaluation
  );
  const { token } = useSelector((state) => state.authUser);
  const [rows, setRows] = useState([]);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  console.log(rows, "rows");
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
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Start Evaluate",
      width: 280,
      renderCell: (params) => {
        // console.log(params.row,'params.row')
        return (
          <>
            <Button
              className={`${params.row.isPending===true?"bg-danger":"bg-site-success"} text-white border-0`}
              disabled={params.row.isPending===false?true:false}
              onClick={() => {
                history.push({
                  pathname: `/teacher/evaluate/${params.row.course_allocation_id}`,
                  state: params.row,
                });
              }}
            >
              {params.row.isPending==false?(<i class="fas fa-check"></i>):(<i class="fas fa-hand-point-right"></i>)}
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    let tempdata = [];
    teacherList.map((item) => {
      return tempdata.push({
        id: item.id,
        teacherName: item.teacherName,
        courseCode: item.courseCode,
        courseName: item.courseName,
        teacher_id:token?.username,
        isPending:item.isPending,
      });
    });
    setRows(tempdata);
  }, [teacherList]);
  useEffect(() => {
    dispatch(getEvaluatingTeacher(token?.username));
  }, [token]);
  return (
    <Container fluid>
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
