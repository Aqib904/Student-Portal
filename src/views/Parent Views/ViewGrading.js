import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Container, Row, Col, CardHeader, Button } from "reactstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AssignmentQuizEvaluation, ExamMarksEvaluation } from "../../store/actions/evaluationAction";
export default function Evaluation() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { general, exam } = useSelector((state) => state.evaluation);
  const [courseCode, setCourseCode] = useState(location?.state.courseCodee);
  const [type, setType] = useState("assignment");
  const [rows, setRows] = useState([]);
  const [exams, setExam] = useState([]);
  const StripedDataGrid = styled(DataGrid)(() => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EEEE",
    },
  }));
  const columns = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "total_marks",
      headerName: "Total Marks",
      width: 170,
    },
    {
      field: "obtained_marks",
      headerName: "obtained Marks",
      width: 170,
    },
    {
      field: "title",
      headerName: "Title",
      width: 170,
    },
  ];
  const columnExam = [
    { field: "id", headerName: "Id", hide: true, filterable: false },
    {
      field: "total_marks",
      headerName: "Total Marks",
      width: 170,
    },
    {
      field: "obtained_marks",
      headerName: "obtained Marks",
      width: 170,
    },
  ];
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    general?.map((item) => {
      return item?.detail?.map((subitem) => {
        if (courseCode == item.courseCode && type == subitem.type) {
          index++;
          return tempdata.push({
            id: index,
            courseName: item.courseName,
            total_marks: subitem.total_marks,
            obtained_marks: subitem.obtained_marks,
            type: subitem.type,
            title: subitem.title,
          });
        }
      });
    });
    setRows(tempdata);
  }, [general, type]);
  useEffect(() => {
    let tempdata = [];
    let index = 0;
    exam?.map((item) => {
      return item?.detail?.map((subitem) => {
        if (courseCode == item.courseCode && type == subitem.type) {
          index++;
          return tempdata.push({
            id: index,
            courseName: item.courseName,
            total_marks: subitem.total_marks,
            obtained_marks: subitem.obtained_marks,
            type: subitem.type,
          });
        }
      });
    });
    setExam(tempdata);
  }, [exam, type]);
  useEffect(() => {
    dispatch(AssignmentQuizEvaluation(location?.state?.username));
  }, []);
  useEffect(() => {
    dispatch(ExamMarksEvaluation(location?.state?.username));
  }, []);
  return (
    <>
      <h4 className="d-block d-md-block m-0 font-weight-bold mx-4">
      <Link
          className="text-dark"
          onClick={() =>
            history.push({
              pathname: `/parent/academic-detail/${location?.state.username}`,
              state: location?.state.username,
            })
          }
        >
          <i class="fas fa-arrow-alt-circle-left"></i>
        </Link>
        &nbsp;Grading
      </h4>
      <Container>
        <Row>
          <Col sm={12} md={12} className="my-3">
            <FormControl
              sx={{ m: 1, minWidth: 180, display: "block" }}
              size="small"
            >
              <InputLabel id="demo-select-small ">Type</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Type"
                required
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="assignment">Assignment</MenuItem>
                <MenuItem value="mid">Mid</MenuItem>
                <MenuItem value="final">Final</MenuItem>
              </Select>
            </FormControl>
            <Card className="shadow my-3 w-100 z-index-n1">
              <CardHeader>
                <h4 className="d-inline-block">Grading</h4>
              </CardHeader>
              <StripedDataGrid
                autoHeight
                autoWidth
                columns={rows.length != 0 ? columns : columnExam}
                rows={rows.length != 0 ? rows : exams}
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
    </>
  );
}
