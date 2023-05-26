import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPeerTeacherEvaluation } from '../../store/actions/TeacherEvaluationAction';
import { useHistory } from 'react-router-dom';
export default function RatingCourses() {
    const dispatch = useDispatch();
    const history  =useHistory();
    const {teacherEvaluation,loading} = useSelector(
        (state) => state.teacherevaluation
      );
      const { token } = useSelector((state) => state.authUser);
      const [rows,setRows] = useState([])
    const StripedDataGrid = styled(DataGrid)(() => ({
        [`& .${gridClasses.row}.even`]: {
          backgroundColor: "#EEEE",
        },
      }));
      const columns = [
        { field: "id", headerName: "Id", hide: true, filterable: false },
        {
            field: "courseCode",
            headerName: " Course Code",
            width: 290,
          },
        {
          field: "courseName",
          headerName: " Course Name",
          width: 350,
        },
        {
            field: "Action",
            type: "action",
            headerName: "View Rating",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <Button
                    className="bg-site-success"
                    onClick={() =>
                      history.push({
                        pathname: `/student/teacher-rating/:${params.row.id}`,
                        state: {courseName:params.row.courseName,questionResult:params.row.questionResult,totalResult:params.row.totalResult},
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
      useEffect(()=>{
        let tempdata = [];
        let index=0;
        teacherEvaluation.map((item)=>{
            index++;
            return(
                tempdata.push({
                    id:index,
                    courseCode:item.courseCode,
                    courseName:item.courseName,
                    questionResult:item.questionResult,
                    totalResult:item.totalResult,
                })
            )
        })
        setRows(tempdata)
      },[teacherEvaluation])
      useEffect(()=>{
        dispatch(getPeerTeacherEvaluation(token?.username))
      },[token])
  return (
    <Container>
    <Row>
      <Col sm={12} md={12}>
        <Card className="shadow my-3 w-100 z-index-n1">
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
        </Card>
      </Col>
    </Row>
  </Container>
  )
}
