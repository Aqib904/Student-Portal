import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersCourses } from "../../store/actions/assessmentAction";
import { styled } from "@mui/material/styles";
import { gridClasses, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useHistory } from "react-router-dom";
export default function CheckEvaluation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allTeachers } = useSelector((state) => state.assessment);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const [select,setSelect] = useState("FALL2022");
  let sessionData = ["FALL2021","SPRING2021","FALL2022","SPRING2022"]
  const [rows,setRows] = useState([])
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 240,
      fixed: true
    }, 
    {
      field: "course_name",
      headerName: "course_name",
      width: 300,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Check Feedback",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Button className="bg-site-success text-white border-0"
             onClick={() => {
              let data ={
                course_code:params.row.course_code,
                teacher_id:params.row.teacher_id,
                session:select,
                teacherName:params.row.teacherName
              }
              history.push({
                pathname: `/admin/evaluationpercentage/${params.row.course_code}`,
                state: data,
              });
            }}>
              <i className="fas fa-star-half-alt "></i>
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if(select!=""){
      dispatch(getTeachersCourses(select));
    }
  }, [select]);
  useEffect(()=>{
    let tempdata =[];
    let index=0;
    allTeachers?.map((item)=>{
        index++
        return(
            tempdata.push({
                id:index,
                teacher_id:item?.teacher_id,
                teacherName:item?.teacherName,
                course_code:item?.course_code,
                course_name:item?.course_name,
            })
        )
    })
    setRows(tempdata)
  },[allTeachers])
  return(
    <>
    <Row>
      <Col className="mx-3">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Session</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  className=""
                  value={select}
                  label="Session"
                  onChange={(e)=>{setSelect(e.target.value)}}
                  required
                >
                  {sessionData.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
      </Col>
    </Row>
    {rows.length==0?(
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center ">
            <Card className="shadow w-50 my-3">
              <CardHeader>Check Evaluation</CardHeader>
              <CardBody>
                  <p className="text-center text-danger">No record about this session!</p>
                </CardBody>
                <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    ):(
    <Container>
        <Row>
            <Col>
            <Card className="shadow my-3 w-100 z-index-n1">
            <StripedDataGrid
              autoHeight
              autoWidth
              columns={columns}
              rows={rows}
              initialState={{
                pinnedColumns: {
                  left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
                },
              }}
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
    )}
    </>
  ) 
}
